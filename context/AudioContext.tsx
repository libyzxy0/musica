import React, { useState, useEffect, createContext, ReactNode } from "react";
import * as MediaLibrary from "expo-media-library";
import { getMetadata } from "@/utils/getAudioMetadata";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  artistsList: ArtistType[];
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
type ArtistType = {
  name: string;
  totalSongs: number;
  image: string;
};

const defaultValues: AudioContextType = {
  audioFiles: [],
  artistsList: [],
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
  const [artistsList, setArtistsList] = useState<ArtistType[]>([]);

  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const createPlaylist = async (name: string) => {
    try {
      if (!name.trim()) {
        throw new Error("Playlist name cannot be empty");
      }

      const genPlayListID = () =>
        Math.floor(Math.random() * 90000000) + 10000000;

      const playlists = await getAllPlaylist();

      const playlistExists = playlists.some(playlist => playlist.name === name);
      if (playlistExists) {
        throw new Error(`A playlist with the name "${name}" already exists`);
      }

      const newPlaylist = {
        id: genPlayListID(),
        name,
        totalSongs: 0
      };

      const updatedPlaylists = [...playlists, newPlaylist];
      await savePlaylists(updatedPlaylists);

      console.log(`Playlist "${name}" created successfully`);
    } catch (error) {
      console.error(
        "Error creating playlist:",
        error instanceof Error ? error.message : error
      );
    }
  };

  const deletePlaylist = async (playlistID: string) => {
    try {
      const playlists = await getAllPlaylist();
      const updatedPlaylists = playlists.filter(
        playlist => playlist.id !== playlistID
      );
      await savePlaylists(updatedPlaylists);
      console.log(`Playlist with ID "${playlistID}" deleted successfully`);
    } catch (error) {
      console.error(
        "Error deleting playlist:",
        error instanceof Error ? error.message : error
      );
    }
  };

  const addSongToPlaylist = async (assetID: string, playlistID: string) => {
    try {
      const playlists = await getAllPlaylist();
      const playlistIndex = playlists.findIndex(
        playlist => playlist.id === playlistID
      );

      if (playlistIndex === -1) {
        throw new Error(`Playlist with ID "${playlistID}" not found`);
      }

      const playlist = playlists[playlistIndex];
      const updatedPlaylist = {
        ...playlist,
        totalSongs: playlist.totalSongs + 1,
        songs: [...(playlist.songs || []), assetID]
      };

      const updatedPlaylists = [
        ...playlists.slice(0, playlistIndex),
        updatedPlaylist,
        ...playlists.slice(playlistIndex + 1)
      ];

      await savePlaylists(updatedPlaylists);
      console.log(
        `Song with ID "${assetID}" added to playlist "${playlist.name}"`
      );
    } catch (error) {
      console.error(
        "Error adding song to playlist:",
        error instanceof Error ? error.message : error
      );
    }
  };

  const removeSongFromPlaylist = async (
    assetID: string,
    playlistID: string
  ) => {
    try {
      const playlists = await getAllPlaylist();
      const playlistIndex = playlists.findIndex(
        playlist => playlist.id === playlistID
      );

      if (playlistIndex === -1) {
        throw new Error(`Playlist with ID "${playlistID}" not found`);
      }

      const playlist = playlists[playlistIndex];
      const updatedPlaylist = {
        ...playlist,
        totalSongs: playlist.totalSongs - 1,
        songs: playlist.songs.filter(songID => songID !== assetID)
      };

      const updatedPlaylists = [
        ...playlists.slice(0, playlistIndex),
        updatedPlaylist,
        ...playlists.slice(playlistIndex + 1)
      ];

      await savePlaylists(updatedPlaylists);
      console.log(
        `Song with ID "${assetID}" removed from playlist "${playlist.name}"`
      );
    } catch (error) {
      console.error(
        "Error removing song from playlist:",
        error instanceof Error ? error.message : error
      );
    }
  };

  const getPlaylistData = async (playlistID: string) => {
    try {
      const playlistsData = await AsyncStorage.getItem("playlists");
      const data = playlistsData ? JSON.parse(playlistsData) : [];
      const playlist = data.find(item => item.id === playlistID);

      if (!playlist) {
        throw new Error(`Playlist with ID "${playlistID}" not found`);
      }

      return playlist;
    } catch (error) {
      console.error(
        "Error fetching playlist data:",
        error instanceof Error ? error.message : error
      );
      return null;
    }
  };

  const getAllPlaylist = async () => {
    try {
      const playlistsData = await AsyncStorage.getItem("playlists");
      return playlistsData ? JSON.parse(playlistsData) : [];
    } catch (error) {
      console.error(
        "Error fetching all playlists:",
        error instanceof Error ? error.message : error
      );
      return [];
    }
  };

  const savePlaylists = async (playlists: Playlist[]): Promise<void> => {
    try {
      await AsyncStorage.setItem("playlists", JSON.stringify(playlists));
    } catch (error) {
      console.error(
        "Error saving playlists:",
        error instanceof Error ? error.message : error
      );
    }
  };

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
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 500
      });

      if (!media.assets?.length) {
        console.log("No audio files found.");
        setAudioLoading(false);
        return;
      }

      for (const asset of media.assets) {
        try {
          if (asset.uri.endsWith(".adt")) return;
          const { metadata } = await getMetadata(asset.uri);

          const newAudioFile: AudioType = {
            id: asset.id,
            uri: asset.uri,
            title: metadata.artwork
              ? metadata.name
              : asset.filename.slice(0, asset.filename.lastIndexOf(".")),
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

          setArtistsList(prevArtists => {
            const artistName = metadata.artwork ? metadata.artist : "Unknown";
            const existing = prevArtists?.find(
              artist => artist.name === artistName
            );

            return existing
              ? prevArtists.map(artist =>
                  artist.name === artistName
                    ? { ...artist, totalSongs: artist.totalSongs + 1 }
                    : artist
                )
              : [
                  ...prevArtists,
                  { name: artistName, totalSongs: 1, image: "" }
                ];
          });
        } catch (error) {
          console.error(
            `Error fetching metadata for asset ${asset.id}:`,
            error
          );
        }
      }
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
        artistsList,
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
