import { Text, View, Button } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { useAudio } from "@/hooks/useAudio";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";
import { DurationSlider } from "@/components/DurationSlider";
import { LinearGradient } from "expo-linear-gradient";
import {StatusBar} from 'react-native';
import logo from '@/assets/images/icon.png'

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function MusicPlayer() {
  const { currentAudioPlaying, pauseAudio, playAudio, handleNext, handlePrevious } = useAudio();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
      colors={
          [colors.background, colors.primary]
        }
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: -0.6 }}
      style={{ flex: 1, padding: 16, paddingTop: StatusBar.currentHeight + 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent"
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <Button
              onPress={() => router.back()}
              contentContainerStyles={{
                flex: 0
              }}
              buttonStyles={{ backgroundColor: "transparent" }}
            >
              <Entypo
                name="chevron-down"
                size={24}
                color={colors.text}
              />
            </Button>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: colors.text
              }}
            >
              Playing from
            </Text>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "Poppins-Bold",
                color: colors.text
              }}
            >
              {currentAudioPlaying?.playedFrom}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <Button
              contentContainerStyles={{
                flex: 0
              }}
              buttonStyles={{ backgroundColor: "transparent" }}
            >
              <Entypo
                name="dots-two-vertical"
                size={24}
                color={colors.text}
              />
            </Button>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 40,
            backgroundColor: "transparent"
          }}
        >
          <Image
            source={currentAudioPlaying?.image ? { uri: currentAudioPlaying?.image } : logo}
            placeholder={{ blurhash }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 16
            }}
          />
        </View>
        <View
          style={{
            marginTop: 70,
            marginHorizontal: 15,
            backgroundColor: "transparent"
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Poppins-Bold",
              color: colors.text
            }}
          >
            {currentAudioPlaying?.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins-Regular",
              color: colors.secondary
            }}
          >
            {currentAudioPlaying?.artist}
          </Text>
        </View>

        <DurationSlider />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
            gap: 30,
            backgroundColor: "transparent"
          }}
        >
          <View style={{ marginTop: 20, backgroundColor: "transparent" }}>
            <Button
            onPress={() => handlePrevious()}
              contentContainerStyles={{
                flex: 0
              }}
              buttonStyles={{ backgroundColor: "transparent" }}
            >
              <Entypo
                name="controller-jump-to-start"
                size={28}
                color={colors.text}
              />
            </Button>
          </View>

          <View style={{ marginTop: 13, backgroundColor: "transparent" }}>
            <Button
              onPress={
                currentAudioPlaying?.isPlaying
                  ? () => pauseAudio(currentAudioPlaying.id)
                  : () => playAudio(currentAudioPlaying.id)
              }
              contentContainerStyles={{
                flex: 0,
                marginLeft: currentAudioPlaying?.isPlaying ? 0 : 2.5
              }}
              buttonStyles={{ height: 60, width: 60, borderRadius: 50 }}
            >
              <Ionicons
                name={currentAudioPlaying?.isPlaying ? "pause" : "play"}
                size={32}
                color={colors.text}
              />
            </Button>
          </View>

          <View style={{ marginTop: 20, backgroundColor: "transparent" }}>
            <Button
            onPress={() => handleNext()}
              contentContainerStyles={{
                flex: 0
              }}
              buttonStyles={{ backgroundColor: "transparent" }}
            >
              <Entypo
                name="controller-next"
                size={28}
                color={colors.text}
              />
            </Button>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
