import { View, Text, useThemeColor } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable } from 'react-native';
import { Link } from 'expo-router';


const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type SongProps = {
  id: string;
  title: string;
  artist: string;
  image: string;
};

export function SongCard({ title, artist, image, id }) {
  return (
    <Pressable>
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: image }}
        placeholder={{ blurhash }}
        style={{
          width: 45,
          height: 45,
          resizeMode: "contain",
          borderRadius: 8
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins-Regular",
            color: useThemeColor({}, "text")
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
