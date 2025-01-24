import { View, Text, Button } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
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
  isInMain?: boolean;
};

export function SongCard({ title, artist, image, id, isInMain }) {
  const { playAudio, currentAudioPlaying, currentPlaylist } = useAudio();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  
  return (
    <Pressable
      onPress={currentAudioPlaying?.id === id ? () => router.push('/audioplayer') : () => playAudio(id, isInMain ? 'main' : currentPlaylist.id)}
      
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
              fontSize: 16,
              fontFamily: "Poppins-Regular",
              color: currentAudioPlaying?.id === id ? colors.primary : colors.text
            }}
          >
            {title.length > 26 ? title.slice(0, 26) + '...' : title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: colors.secondary
            }}
          >
            {artist}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          right: 10,
          flex: 1,
          flexDirection: 'row-reverse'
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
            color={colors.secondary}
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
