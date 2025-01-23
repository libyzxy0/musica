import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View, Text } from "@/components/Themed";
import { StyleSheet, ScrollView, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SongCard } from "@/components/SongCard";
import { useAudio } from "@/hooks/useAudio";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {StatusBar} from 'react-native';

export default function PlaylistSongs() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const { audioFiles: songsData, getPermissions } = useAudio();
  const { currentAudioPlaying, pauseAudio, playAudio, audioLoading, currentPlaylist } =
    useAudio();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}
    >
      <FlatList
        data={songsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SongCard
            id={item.id}
            title={item.title}
            artist={item.artist}
            image={item.image}
          />
        )}
        ListHeaderComponent={
          <LinearGradient
            colors={[colors.background, "#8f0a1a"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: -0.6 }}
            style={{
              paddingTop: StatusBar.currentHeight
            }}
          >
            <View transparent={true} style={styles.headerContainer}>
              <Pressable style={{
                position: 'absolute',
                top: 20,
                left: 20
              }} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </Pressable>
              <View transparent={true}>
                <Text style={styles.headerTitle}>{currentPlaylist.name}</Text>
                <Text style={{ fontSize: 14, color: colors.secondary }}>
                  {audioLoading
                    ? "Loading songs..."
                    : `${songsData.length} songs`}
                </Text>
              </View>
              <View transparent={true} style={styles.buttonCon}>
                <Button
                  contentContainerStyles={styles.buttonContent}
                  buttonStyles={styles.shuffleButton}
                  accessibilityLabel="Shuffle"
                >
                  <Ionicons name="shuffle" size={32} color={colors.primary} />
                </Button>
                <Button
                  onPress={
                    currentAudioPlaying?.isPlaying
                      ? () => pauseAudio(currentAudioPlaying.id)
                      : () =>
                          playAudio(
                            currentAudioPlaying?.id
                              ? currentAudioPlaying.id
                              : songsData[0].id,
                            "main"
                          )
                  }
                  contentContainerStyles={[
                    styles.buttonContent,
                    { marginLeft: currentAudioPlaying?.isPlaying ? 0 : 2.5 }
                  ]}
                  buttonStyles={styles.playButton}
                  accessibilityLabel="Play"
                >
                  <Ionicons
                    name={currentAudioPlaying?.isPlaying ? "pause" : "play"}
                    size={28}
                    color="white"
                  />
                </Button>
              </View>
            </View>
          </LinearGradient>
        }
        contentContainerStyle={{
          gap: 15,
          paddingBottom: currentAudioPlaying ? 140 : 80
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 90,
    paddingBottom: 25,
    paddingHorizontal: 25
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold"
  },
  buttonCon: {
    flexDirection: "row"
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center"
  },
  shuffleButton: {
    width: 50,
    height: 50,
    padding: 0,
    backgroundColor: "transparent",
    marginRight: 10
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});
