import { View, Text, useThemeColor, Button } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useAudio } from "@/hooks/useAudio";
import { router } from 'expo-router';
import logo from '@/assets/images/icon.png'
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type SongProps = {
  id: string;
  title: string;
  artist: string;
  image: string;
};

export function SongCard({ title, artist, image, id }) {
  const { playAudio, currentAudioPlaying } = useAudio();
  return (
    <Pressable
      onPress={currentAudioPlaying?.id === id ? () => router.push('/audioplayer') : () => playAudio(id, "playlist-7836502")}
      
      style={({ pressed }) => [
        { backgroundColor: "transparent", opacity: pressed ? 0.8 : 1 },
        {
          flex: 1,
          flexDirection: "row",
          alignItems: "center"
        }
      ]}
    >
      <View style={styles.cardContainer}>
        <Image
          source={image ? { uri: image } : logo}
          placeholder={{ blurhash }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 8
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Poppins-Regular",
              color: useThemeColor(
                {},
                currentAudioPlaying?.id === id ? "primary" : "text"
              )
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: useThemeColor({}, "secondary")
            }}
          >
            {artist}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          right: 20
        }}
      >
        <Button
          buttonStyles={{
            backgroundColor: "transparent"
          }}
        >
          <Entypo
            name="dots-two-vertical"
            size={18}
            color={useThemeColor({}, "secondary")}
          />
        </Button>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10
  }
});
