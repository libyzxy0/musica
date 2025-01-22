import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { FlatList } from "react-native";
import { View, Text, Button } from "@/components/Themed";
import { TextInput } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { useAudio } from "@/hooks/useAudio";
import { Pressable } from "react-native";
import { useState } from "react";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

const dataPlaylist = [
  { id: "1928227", title: "Liked Songs", totalSongs: "50", color: "#8f0a1a" },
  { id: "2262626", title: "Top 50 Philippines", totalSongs: "20", color: "#3498db" },
  { id: "3262626", title: "90's OPM Hits", totalSongs: "80", color: "#ff69b4" },
  { id: "7272724", title: "Chill", totalSongs: "30", color: "#4caf50" },
];

export default function Playlist() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const [modalVisible, setModalVisible] = useState(false);
  const { currentAudioPlaying } = useAudio();
  
  const handlePlaylistClick = () => {
    router.push('/(tabs)/playlist-songs')
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}
    >
      <Header name="Playlist" />

      <Modal
        isVisible={modalVisible}
        hasBackdrop={true}
        backdropColor={colors.background}
        backdropOpacity={0.8}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <LinearGradient
          colors={
            theme === "dark"
              ? [colors.foreground, colors.foreground]
              : [colors.foreground, colors.foreground]
          }
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{
            backgroundColor: colors.foreground,
            padding: 15,
            borderRadius: 6
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Bold",
                color: colors.primary,
                width: 270
              }}
            >
              Create Playlist
            </Text>

            <Pressable onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={20} color={colors.secondary} />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 15,
              backgroundColor: "transparent"
            }}
          >
            <View transparent={true}>
              <Text
                style={{
                  fontSize: 13,
                  marginBottom: 5
                }}
              >
                Name
              </Text>
              <TextInput
                placeholder="Ang pogi ni liby"
                placeholderTextColor={colors.secondary}
                style={{
                  backgroundColor: colors.foreground,
                  borderWidth: 1.5,
                  borderColor: colors.borderColor,
                  borderRadius: 6,
                  paddingHorizontal: 8,
                  color: colors.text,
                  fontFamily: "Poppins-Regular"
                }}
              />
            </View>
            <Button buttonStyles={{ marginTop: 10 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Bold",
                  color: colors.text
                }}
              >
                Create
              </Text>
            </Button>
          </View>
        </LinearGradient>
      </Modal>

      <FlatList
        data={dataPlaylist}
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 19,
                color: colors.text
              }}
            >
              My Playlist
            </Text>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 16,
                  color: colors.primary
                }}
              >
                Create
              </Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
        <Pressable onPress={handlePlaylistClick}>
          <LinearGradient
            colors={[colors.background, item.color]}
            start={{ x: 1, y: 5.5 }}
            end={{ x: 4, y: -9 }}
            style={{
              backgroundColor: colors.foreground,
              width: 160,
              height: 60,
              borderRadius: 4,
              padding: 10
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 16,
                color: colors.text
              }}
            >
              {item.title}
            </Text>
            <Text style={{ fontSize: 12, color: colors.secondary }}>
              {item.totalSongs} songs
            </Text>
          </LinearGradient>
          </Pressable>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          marginTop: 20,
          paddingHorizontal: 10,
          gap: 10,
          paddingBottom: currentAudioPlaying ? 160 : 90
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-evenly"
        }}
      />
    </SafeAreaView>
  );
}
