import React, { useState, createContext, ReactNode } from 'react';
import * as MediaLibrary from 'expo-media-library'

const songsData = [
  {
    id: "1",
    title: "Dilaw",
    artist: "Maki",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ef/55/f4/ef55f4c0-a905-2430-5e2a-e76182c96936/198588002179.jpg/592x592bb.webp"
  },
  {
    id: "2",
    title: "Ang Huling El Bimbo",
    artist: "Eraserheads",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3JSeZlXcWKZ81d_UBV_uEDIm4uBzGi2Rl0cjIKpg7A&s"
  },
  {
    id: "3",
    title: "With A Smile",
    artist: "Eraserheads",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjJ39oQaNb1v2c_rq3DoRIBXcnnn1I7em7A&s"
  },
  {
    id: "4",
    title: "Bagsakan",
    artist: "Parokya Ni Edgar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxVV3mM8ee2K9ME45NZSEh7PYvIIVSNewLw8ckd57vBw&s"
  },
  {
    id: "5",
    title: "Sila",
    artist: "SUD",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1BrJ-bXlC-XeruRe12x-ptnx7We9rRZA7A&s"
  },
  {
    id: "6",
    title: "Pag-ibig",
    artist: "Sponge Cola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPxfpMNgtsXINVS41LwNfUBj32xWxC9ZhxKRL6FW1ZGNnUktRyLkqS0Y2&s=10"
  },
  {
    id: "7",
    title: "Ikaw At Ako",
    artist: "TJ Monterde",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDX0Rdtvwxwqo4el7cKj3v64mahgyDcFcOKg&usqp=CAU"
  },
  {
    id: "8",
    title: "Walang Iba",
    artist: "Ezra Band",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvwvvRBZyuDfMPJxUE7ssc4UHphAvClbWAMxc0q4EzhPjUpKftG7fxO70&s=10"
  },
  {
    id: "9",
    title: "Migraine",
    artist: "Moonstar88",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjrpX0cVPtZGDCir3IU2tz5_zWIcHorgvzSg&s"
  },
  {
    id: "10",
    title: "Mundo",
    artist: "IV of Spades",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbK8J8GkHK_LSYJ7dchmGADQBO8tHApKyF9w&s"
  }
];

type AudioContextType = {
  audioFiles: any[];
  currentAudioPlaying: any | null;
  isGranted: boolean;
  isPlaying: boolean;
  setAudioFiles: (files: any[]) => void;
  setCurrentAudioPlaying: (audio: any | null) => void;
  setIsGranted: (granted: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  getPermissions: () => Promise<void>;
  playAudio: (id: string) => void;
  pauseAudio: (id: string) => void;
  stopAudio: () => void;
};

const defaultValues: AudioContextType = {
  audioFiles: [],
  currentAudioPlaying: null,
  isGranted: false,
  isPlaying: false,
  setAudioFiles: () => {},
  setCurrentAudioPlaying: () => {},
  setIsGranted: () => {},
  setIsPlaying: () => {},
  getPermissions: async () => {},
  playAudio: () => {},
  pauseAudio: () => {}
};


export const AudioContext = createContext<AudioContextType>(defaultValues);

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [audioFiles, setAudioFiles] = useState<any[]>(songsData);
  const [isGranted, setIsGranted] = useState(false);
  const [currentAudioPlaying, setCurrentAudioPlaying] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getPermissions = async () => {
    const permission = await MediaLibrary.getPermissionAsync();
    console.log(permission)
  };
  
  const getAllAudioFiles = async () => {
    
  }

  const playAudio = (id: string) => {
    
  };

  const pauseAudio = (id: string) => {
    
  };

  return (
    <AudioContext.Provider
      value={{
        audioFiles,
        currentAudioPlaying,
        isGranted,
        isPlaying,
        setAudioFiles,
        setCurrentAudioPlaying,
        setIsGranted,
        setIsPlaying,
        getPermissions,
        playAudio,
        pauseAudio
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};