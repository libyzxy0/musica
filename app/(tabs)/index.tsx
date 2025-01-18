import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View, Text } from "@/components/Themed";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SongCard } from "@/components/SongCard";

const songsData = [
  {
    id: "1",
    title: "Dilaw",
    artist: "Maki",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ef/55/f4/ef55f4c0-a905-2430-5e2a-e76182c96936/198588002179.jpg/592x592bb.webp"
  },
  {
    id: "2",
    title: "Ang Huling El Bimbo",
    artist: "Eraserheads",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3JSeZlXcWKZ81d_UBV_uEDIm4uBzGi2Rl0cjIKpg7A&s"
  },
  {
    id: "3",
    title: "With A Smile",
    artist: "Eraserheads",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjJ39oQaNb1v2c_rq3DoRIBXcnnn1I7em7A&s"
  },
  {
    id: "4",
    title: "Bagsakan",
    artist: "Parokya Ni Edgar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxVV3mM8ee2K9ME45NZSEh7PYvIIVSNewLw8ckd57vBw&s"
  },
  {
    id: "5",
    title: "Sila",
    artist: "SUD",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1BrJ-bXlC-XeruRe12x-ptnx7We9rRZA7A&s"
  },
  {
    id: "6",
    title: "Pag-ibig",
    artist: "Sponge Cola",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPxfpMNgtsXINVS41LwNfUBj32xWxC9ZhxKRL6FW1ZGNnUktRyLkqS0Y2&s=10"
  },
  {
    id: "7",
    title: "Ikaw At Ako",
    artist: "TJ Monterde",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDX0Rdtvwxwqo4el7cKj3v64mahgyDcFcOKg&usqp=CAU"
  },
  {
    id: "8",
    title: "Walang Iba",
    artist: "Ezra Band",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvwvvRBZyuDfMPJxUE7ssc4UHphAvClbWAMxc0q4EzhPjUpKftG7fxO70&s=10"
  },
  {
    id: "9",
    title: "Migraine",
    artist: "Moonstar88",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjrpX0cVPtZGDCir3IU2tz5_zWIcHorgvzSg&s"
  },
  {
    id: "10",
    title: "Mundo",
    artist: "IV of Spades",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbK8J8GkHK_LSYJ7dchmGADQBO8tHApKyF9w&s"
  }
];

export default function Songs() {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = Colors[theme];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorFromProps.background
      }}
    >
      <Header name="Songs" />
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
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerTitle}>All Songs</Text>
              <Text style={{ fontSize: 14, color: colorFromProps.secondary }}>
                46 songs
              </Text>
            </View>
            <View style={styles.buttonCon}>
              <Button
                contentContainerStyles={styles.buttonContent}
                buttonStyles={styles.shuffleButton}
                accessibilityLabel="Shuffle"
              >
                <Ionicons
                  name="shuffle"
                  size={32}
                  color={colorFromProps.primary}
                />
              </Button>
              <Button
                contentContainerStyles={styles.buttonContent}
                buttonStyles={styles.playButton}
                accessibilityLabel="Play"
              >
                <Ionicons name="play" size={28} color="white" />
              </Button>
            </View>
          </View>
        }
        contentContainerStyle={styles.songsContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    paddingHorizontal: 25
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: "Poppins-Bold"
  },
  buttonCon: {
    flexDirection: "row"
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2.5
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
  },
  songsContainer: {
    gap: 15,
    paddingBottom: 80
  }
});
