import React, { useState, useEffect, createContext, ReactNode } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { getMetadata } from '@/utils/getAudioMetadata';

type AudioContextType = {
  audioFiles: any[];
  currentAudioPlaying: any | null;
  isGranted: boolean;
  setAudioFiles: (files: any[]) => void;
  setCurrentAudioPlaying: (audio: any | null) => void;
  getPermissions: () => Promise<void>;
};

const defaultValues: AudioContextType = {
  audioFiles: [],
  currentAudioPlaying: null,
  isGranted: false,
  setAudioFiles: () => {},
  setCurrentAudioPlaying: () => {},
  getPermissions: async () => {},
};

export const AudioContext = createContext<AudioContextType>(defaultValues);

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [isGranted, setIsGranted] = useState(false);
  const [currentAudioPlaying, setCurrentAudioPlaying] = useState<any | null>(null);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const getPermissions = async () => {
    console.log("Asking permission...", permission);

    requestPermission();

    if (permission.granted) {
      await getAllAudioFiles();
      setIsGranted(true)
    } else if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await getAllAudioFiles();
        setIsGranted(true)
      } else if (status === 'denied' && canAskAgain) {
        console.log('Media permission denied by the user!');
      }
    }
  };

  const getAllAudioFiles = async () => {
  try {
    const media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: 1000 });
    if (!media.assets?.length) {
      console.log("No audio files found.");
      return;
    }

    const audioFiles = (
      await Promise.all(
        media.assets.map(async (asset) => {
          try {
            const { metadata } = await getMetadata(asset.uri);
            return {
              title: metadata.name || "Unknown Title",
              id: asset.id,
              artist: metadata.artist || "Unknown Artist",
              image: metadata.artwork || null,
            };
          } catch {
            return null;
          }
        })
      )
    ).filter(Boolean);

    setAudioFiles(audioFiles);
    console.log(`${audioFiles.length} audio files loaded.`);
  } catch (error) {
    console.error("Error fetching audio files:", error);
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
        isGranted,
        setAudioFiles,
        setCurrentAudioPlaying,
        getPermissions,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
