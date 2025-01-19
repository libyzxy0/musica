import { View, Text, useThemeColor, Button } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useAudio } from '@/hooks/useAudio'
import { router } from 'expo-router';
import { Pressable } from "react-native";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  
export default function FloatingPlayerWidget() {
  const { currentAudioPlaying, pauseAudio, playAudio } = useAudio();
  const theme = useColorScheme() ?? "light";
  const colorFromProps = Colors[theme];
  return (
    <Pressable onPress={() => router.push('/audioplayer')}>
    <LinearGradient
        colors={
          theme === "dark"
            ? ["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)"]
            : ["rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)"]
        }
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={[
          { backgroundColor: colorFromProps.foreground },
          styles.playerWidget
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
            backgroundColor: "transparent"
          }}
        >
          <Image
            source={{
              uri: currentAudioPlaying?.image
            }}
            placeholder={{ blurhash }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
              borderRadius: 6
            }}
          />

          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: useThemeColor({}, "text"),
                paddingTop: 3
              }}
            >
              {currentAudioPlaying?.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Regular",
                color: useThemeColor({}, "secondary"),
              }}
            >
              {currentAudioPlaying?.artist}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            position: "absolute",
            right: 20,
            backgroundColor: "transparent",
            gap: 12
          }}
        >
          <Button
            buttonStyles={{
              padding: 0,
              backgroundColor: "transparent"
            }}
            accessibilityLabel="Favorite"
          >
            <Ionicons name="heart-outline" size={24} color={colorFromProps.primary} />
          </Button>
          <Button
          onPress={currentAudioPlaying?.isPlaying ? () => pauseAudio(currentAudioPlaying.id) : () => playAudio(currentAudioPlaying.id)}
            buttonStyles={{
              padding: 0,
              backgroundColor: "transparent"
            }}
            accessibilityLabel="Play/Pause"
          >
            <Ionicons name={currentAudioPlaying?.isPlaying ? 'pause' : 'play'} size={24} color={colorFromProps.primary} />
          </Button>
        </View>
          <View style={{
          position: 'absolute',
          bottom: 2,
          height: 2,
          borderRadius: 6,
          backgroundColor: useThemeColor({}, 'primary'),
          width: `${parseInt(currentAudioPlaying?.durationPercentage)}%`,
          left: 5
        }}></View>
        
      </LinearGradient>
      </Pressable>
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