import React, { useState, useEffect, createContext, ReactNode } from "react";
import * as MediaLibrary from "expo-media-library";
import { getMetadata } from "@/utils/getAudioMetadata";
import { Audio } from "expo-av";

type AudioType = {
  id: string;
  uri: string;
  title: string;
  artist: string;
  image: string;
};

type CurrentPlayingAudioType = {
  id: string;
  uri: string;
  title: string;
  artist: string;
  image: string;
  isPlaying: boolean;
  playedFrom: string;
  currentDuration: number;
  endDuration: number;
};

type AudioContextType = {
  audioFiles: AudioType[];
  currentAudioPlaying: any | null;
  isGranted: boolean;
  setAudioFiles: (files: AudioType[]) => void;
  setCurrentAudioPlaying: (audio: AudioType | null) => void;
  getPermissions: () => Promise<void>;
};

const defaultValues: AudioContextType = {
  audioFiles: [],
  currentAudioPlaying: null,
  getPermissions: async () => {}
};

export const AudioContext = createContext<AudioContextType>(defaultValues);

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [audioFiles, setAudioFiles] = useState<AudioType[]>([]);
  const [isGranted, setIsGranted] = useState(false);
  const [currentAudioPlaying, setCurrentAudioPlaying] =
    useState<CurrentPlayingAudioType | null>(null);
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [sound, setSound] = useState();

  const getPermissions = async () => {
    requestPermission();

    if (permission.granted) {
      await getAllAudioFiles();
      setIsGranted(true);
    } else if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await getAllAudioFiles();
        setIsGranted(true);
      } else if (status === "denied" && canAskAgain) {
        console.log("Media permission denied by the user!");
      }
    }
  };

  const getAllAudioFiles = async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 1000
      });
      if (!media.assets?.length) {
        console.log("No audio files found.");
        return;
      }

      const audioFiles = (
        await Promise.all(
          media.assets.map(async asset => {
            try {
              const { metadata } = await getMetadata(asset.uri);
              return {
                title: metadata.name || asset.filename,
                id: asset.id,
                uri: asset.uri,
                artist: metadata.artist || "Unknown Artist",
                image: metadata.artwork || null
              };
            } catch {
              return null;
            }
          })
        )
      ).filter(Boolean);

      setAudioFiles(audioFiles);
    } catch (error) {
      console.error("Error fetching audio files:", error);
    }
  };

  const playAudio = async (id: string, playedFrom?: string) => {
    try {
      if (currentAudioPlaying && currentAudioPlaying.id === id && sound) {
        console.log("Resuming audio:", id);
        await sound.playAsync();
        setCurrentAudioPlaying(prev => ({
          ...prev,
          isPlaying: true
        }));
        return;
      }

      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        console.log("Previous audio stopped and unloaded.");
      }

      const audioToPlay = audioFiles.find(item => item.id === id);
      if (!audioToPlay) {
        console.error("Audio file not found for id:", id);
        return;
      }
      
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true
      });

      const { sound: nSound, status } = await Audio.Sound.createAsync(
        { uri: audioToPlay.uri },
        { shouldPlay: true }
      );

      setSound(nSound);

      setCurrentAudioPlaying({
        id: audioToPlay.id,
        uri: audioToPlay.uri,
        title: audioToPlay.title,
        artist: audioToPlay.artist,
        image: audioToPlay.image,
        isPlaying: status.isPlaying,
        playedFrom,
        currentDuration: status.positionMillis || 0,
        endDuration: status.durationMillis || 0
      });

      nSound.setOnPlaybackStatusUpdate(playbackStatus => {
        if (playbackStatus.isLoaded) {
          setCurrentAudioPlaying(prev => ({
            ...prev,
            isPlaying: playbackStatus.isPlaying,
            currentDuration: playbackStatus.positionMillis || 0,
            endDuration: playbackStatus.durationMillis || 0
          }));
        }
      });
    } catch (error) {
      console.error("Error in playAudio:", error);
    }
  };

  const pauseAudio = async (id: string, playedFrom?: string) => {
    try {
      console.log("Paused:", id);
      if (sound) {
        await sound.pauseAsync();
        setCurrentAudioPlaying(prev => ({
          ...prev,
          isPlaying: false
        }));
      }
    } catch (error) {
      console.error("Error in pauseAudio:", error);
    }
  };

  useEffect(() => {
    getPermissions();
    getAllAudioFiles();
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioFiles,
        currentAudioPlaying,
        getPermissions,
        playAudio,
        pauseAudio
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
