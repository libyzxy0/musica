import {
  SafeAreaView
} from "react-native-safe-area-context";
import Header from "@/components/Header";
import {
  FlatList
} from "react-native";
import {
  View,
  Text,
  Button
} from "@/components/Themed";
import {
  TextInput
} from "react-native";
import Colors from "@/constants/Colors";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import {
  LinearGradient
} from "expo-linear-gradient";
import {
  router
} from 'expo-router';
import {
  useAudio
} from "@/hooks/useAudio";
import {
  Pressable
} from "react-native";
import {
  useState,
  useEffect
} from "react";
import Modal from "react-native-modal";
import {
  AntDesign
} from "@expo/vector-icons";

export default function Playlist() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const [modalVisible,
    setModalVisible] = useState(false);
  const {
    currentAudioPlaying,
    createPlaylist,
    allPlaylist,
    setPlaylist
  } = useAudio();
  const [playlistName,
    setPlaylistName] = useState("")
    
  const handlePlaylistClick = async (id: string) => {
    await setPlaylist(id);
    router.push('/(tabs)/playlist-songs');
  }

  const handleCreatePlaylist = async () => {
    const isCreated = await createPlaylist(playlistName)
    setPlaylistName("");
    setModalVisible(false);
  }

  return (
    <SafeAreaView
      style={ {
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
          [colors.background, colors.foreground]

          }
          start={ { x: 0.5, y: 1 }}
          end={ { x: 0.5, y: 0 }}
          style={ {
            backgroundColor: colors.foreground,
            padding: 15,
            borderRadius: 6
          }}
          >
          <View
            style={ {
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
            >
            <Text
              style={ {
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
            style={ {
              marginTop: 15,
              backgroundColor: "transparent"
            }}
            >
            <View transparent={true}>
              <Text
                style={ {
                  fontSize: 13,
                  marginBottom: 5
                }}
                >
                Name
              </Text>
              <TextInput
                onChangeText={(name) => setPlaylistName(name)}
                value={playlistName}
                placeholder="i love RN"
                placeholderTextColor={colors.secondary}
                style={ {
                  backgroundColor: colors.foreground,
                  borderWidth: 1.5,
                  borderColor: colors.borderColor,
                  borderRadius: 6,
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  color: colors.text,
                  fontFamily: "Poppins-Regular"
                }}
                />
            </View>
            <Button onPress={handleCreatePlaylist} buttonStyles={ { marginTop: 10 }}>
              <Text
                style={ {
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
      
      {allPlaylist && allPlaylist.length > 0 ?
      <FlatList
        data={allPlaylist}
        ListHeaderComponent={
        <View
          style={ {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginBottom: 10
          }}
          >
          <Text
            style={ {
              fontFamily: "Poppins-Bold",
              fontSize: 19,
              color: colors.text
            }}
            >
            My Playlist
          </Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text
              style={ {
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
        renderItem={({
          item
        }) => (
          <Pressable onPress={() => handlePlaylistClick(item.id)} key={item.id}>
            <LinearGradient
              colors={[colors.background, `${item.color ? item.color: colors.primary}`]}
              start={ { x: 1, y: 5.5 }}
              end={ { x: 4, y: -9 }}
              style={ {
                backgroundColor: colors.foreground,
                width: 160,
                height: 60,
                borderRadius: 4,
                padding: 10
              }}
              >
              <Text
                style={ {
                  fontFamily: "Poppins-Bold",
                  fontSize: 16,
                  color: colors.text
                }}
                >
                {item.name}
              </Text>
              <Text style={ { fontSize: 12, color: colors.secondary }}>
                {item.totalSongs} songs
              </Text>
            </LinearGradient>
          </Pressable>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={ {
          marginTop: 20,
          paddingHorizontal: 10,
          gap: 10,
          paddingBottom: currentAudioPlaying ? 160: 90
        }}
        numColumns={2}
        columnWrapperStyle={ {
          justifyContent: allPlaylist?.length > 1 ? 'space-evenly' : 'flex-start',
        }}
        /> : <View style={{
          marginTop: 200
        }}>
          <Text style={{
            textAlign: 'center',
            color: colors.text,
            fontFamily: 'Poppins-Bold',
            fontSize: 32,
          }}>Ohh nooo 😱😱</Text>
          <Text style={{
            textAlign: 'center',
            color: colors.secondary,
            fontSize: 15,
          }}>There's no playlist yet!</Text>
            <Button
            onPress={() => setModalVisible(true)}
            buttonStyles={{
              marginHorizontal: 100,
              marginTop: 30
            }}>
              <Text style={{
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
              }}>Create Playlist</Text>
            </Button>
        </View>}
    </SafeAreaView>
  );
}