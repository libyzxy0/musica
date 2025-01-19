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
  durationPercentage: number;
};

type AudioContextType = {
  audioFiles: AudioType[];
  currentAudioPlaying: any | null;
  isGranted: boolean;
  setAudioFiles: (files: AudioType[]) => void;
  setCurrentAudioPlaying: (audio: AudioType | null) => void;
  setPosition: (millis: number) => void;
  getPermissions: () => Promise<void>;
  getAllAudioFiles: () => Promise<void>;
  handleNext: () => Promise<void>;
  handlePrevious: () => Promise<void>;
  audioLoading: boolean;
};

const defaultValues: AudioContextType = {
  audioFiles: [],
  currentAudioPlaying: null,
  getPermissions: async () => {},
  getAllAudioFiles: async () => {},
  handleNext: async () => {},
  handlePrevious: async () => {},
  setPosition: async () => {},
  audioLoading: false
};

export const AudioContext = createContext<AudioContextType>(defaultValues);

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [audioFiles, setAudioFiles] = useState<AudioType[]>([]);
  const [audioLoading, setAudioLoading] = useState(true);
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
      setAudioLoading(true);
      console.log("Loading audio files...");
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 500
      });

      if (!media.assets?.length) {
        console.log("No audio files found.");
        setAudioLoading(false);
        return;
      }

      console.log("Assets loaded, processing metadata...");

      for (const asset of media.assets) {
        try {
          if(asset.uri.endsWith(".adt")) return;
          const { metadata } = await getMetadata(asset.uri);
          console.log("metadata:",metadata)
    
          const newAudioFile: AudioType = {
            id: asset.id,
            uri: asset.uri,
            title: metadata.artwork ? metadata.name : (asset.filename.split(".mp3"))[0],
            artist: metadata.artwork ? metadata.artist : "Unknown Artist",
            image: metadata.artwork || null
          };

          setAudioFiles(prevAudioFiles => {
            if (prevAudioFiles.some(file => file.id === newAudioFile.id)) {
              return prevAudioFiles;
            }
            return [...prevAudioFiles, newAudioFile].sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          });

          console.log(`Loaded metadata for: ${newAudioFile.title}`);
        } catch (error) {
          console.error(
            `Error fetching metadata for asset ${asset.id}:`,
            error
          );
        }
      }

      console.log("Finished processing audio files.");
    } catch (error) {
      console.error("Error fetching audio files:", error);
    } finally {
      setAudioLoading(false);
    }
  };

  const handlePlaybackFinish = async (id: string, playedFrom: string) => {
    const indx = audioFiles.findIndex(a => a.id === id);
    playAudio(audioFiles[indx + 1].id, playedFrom, true);
  };

  const handleNext = async () => {
    const { id, playedFrom } = currentAudioPlaying;
    const indx = audioFiles.findIndex(a => a.id === id);
    playAudio(audioFiles[indx + 1].id, playedFrom, false);
  };

  const handlePrevious = async () => {
    const { id, playedFrom } = currentAudioPlaying;
    const indx = audioFiles.findIndex(a => a.id === id);
    playAudio(audioFiles[indx - 1].id, playedFrom, false);
  };

  const playAudio = async (id: string, playedFrom?: string, m: boolean) => {
    try {
      if (currentAudioPlaying && currentAudioPlaying.id === id && sound) {
        await sound.playAsync();
        setCurrentAudioPlaying(prev => ({
          ...prev,
          isPlaying: true
        }));
        return;
      }

      if (sound && !m) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
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
        endDuration: status.durationMillis || 0,
        durationPercentage: 0
      });

      nSound.setOnPlaybackStatusUpdate(playbackStatus => {
        if (playbackStatus.isLoaded) {
          if (playbackStatus.didJustFinish) {
            handlePlaybackFinish(id, playedFrom);
          }

          setCurrentAudioPlaying(prev => ({
            ...prev,
            isPlaying: playbackStatus.isPlaying,
            currentDuration: playbackStatus.positionMillis || 0,
            endDuration: playbackStatus.durationMillis || 0,
            durationPercentage: playbackStatus.durationMillis
              ? Math.round(
                  (playbackStatus.positionMillis /
                    playbackStatus.durationMillis) *
                    100
                )
              : 0
          }));
        }
      });
    } catch (error) {
      console.error("Error in playAudio:", error);
    }
  };

  const pauseAudio = async (id: string, playedFrom?: string) => {
    try {
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

  const setPosition = async (millis: number) => {
    await sound.setPositionAsync(millis);
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
        getAllAudioFiles,
        handleNext,
        handlePrevious,
        audioLoading,
        playAudio,
        pauseAudio,
        setPosition
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
