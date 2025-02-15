import {
  View,
  Text,
  Button
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  LinearGradient
} from "expo-linear-gradient";
import {
  Image
} from "expo-image";
import {
  Ionicons,
  Feather
} from "@expo/vector-icons";
import logo from '@/assets/images/icon.png'
import {
  StyleSheet
} from "react-native";
import {
  useAudio
} from '@/hooks/useAudio'
import {
  router
} from 'expo-router';
import {
  Pressable
} from "react-native";
import React, {
  useEffect,
  useState
} from 'react';

const blurhash =
"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function FloatingPlayerWidget() {
  const {
    currentAudioPlaying,
    pauseAudio,
    playAudio,
    getPlaylistsContainingSong
  } = useAudio();
  const [includedTo, setIncludedTo] = useState(false);
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  useEffect(() => {
    const getD = async () => {
      const whichPlaylists = await getPlaylistsContainingSong(currentAudioPlaying.id);
      setIncludedTo(whichPlaylists.length > 0 ? true : false);
    }
    getD();
  }, [currentAudioPlaying]);

  return (
    <>
      <Pressable onPress={() => router.push('/audioplayer')}>
        <LinearGradient
          colors={
          theme === "dark"
          ? ["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)"]: [colors.foreground, colors.foreground]
          }
          start={ { x: 0.5, y: 1 }}
          end={ { x: 0.5, y: 0 }}
          style={[{ backgroundColor: colors.foreground },
            styles.playerWidget
          ]}
          >
          <View
            style={ {
              flex: 1,
              flexDirection: "row",
              gap: 10,
              backgroundColor: "transparent"
            }}
            >
            <Image
              source={currentAudioPlaying?.image ? { uri: currentAudioPlaying?.image }: logo}
              placeholder={ { blurhash }}
              style={ {
                width: 40,
                height: 40,
                resizeMode: "contain",
                borderRadius: 6
              }}
              />

            <View style={ { backgroundColor: "transparent", flex: 1 }}>
              <Text
                style={ {
                  fontSize: 14,
                  fontFamily: "Poppins-Regular",
                  color: colors.text,
                  paddingTop: 3
                }}
                >
                {currentAudioPlaying?.title}
              </Text>
              <Text
                style={ {
                  fontSize: 12,
                  fontFamily: "Poppins-Regular",
                  color: colors.secondary,
                }}
                >
                {currentAudioPlaying?.artist}
              </Text>
            </View>
          </View>
          <View
            style={ {
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              right: 20,
              backgroundColor: "transparent",
              gap: 18
            }}
            >
            <Button
              onPress={() => router.push(`/addtoplaylist/${currentAudioPlaying?.id}`)}
              buttonStyles={ {
                padding: 0,
                backgroundColor: "transparent"
              }}
              accessibilityLabel="Add to Playlist"
              >
              <Feather name="plus-circle" size={23} color={includedTo ? colors.primary : colors.text} />
            </Button>
            <Button
              onPress={currentAudioPlaying?.isPlaying ? () => pauseAudio(currentAudioPlaying.id): () => playAudio(currentAudioPlaying.id)}
              buttonStyles={ {
                padding: 0,
                backgroundColor: "transparent"
              }}
              accessibilityLabel="Play/Pause"
              >
              <Ionicons name={currentAudioPlaying?.isPlaying ? 'pause': 'play'} size={24} color={colors.text} />
            </Button>
          </View>
          <View style={ {
            position: 'absolute',
            bottom: 2,
            height: 2,
            borderRadius: 6,
            backgroundColor: colors.primary,
            width: `${parseInt(currentAudioPlaying?.durationPercentage)}%`,
            left: 5
          }}></View>

        </LinearGradient>
      </Pressable>
    </>
  )
}

  const styles = StyleSheet.create({
    playerWidget: {
      marginHorizontal: 15,
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      gap: 10,
      position: "absolute",
      bottom: 70,
      borderRadius: 6,
      paddingVertical: 5,
      paddingHorizontal: 5
    }
  })