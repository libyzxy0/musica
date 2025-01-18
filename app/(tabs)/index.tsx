import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View, Text } from "@/components/Themed";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SongCard } from "@/components/SongCard";
import { useAudio } from '@/hooks/useAudio'



export default function Songs() {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = Colors[theme];
  const {audioFiles: songsData} = useAudio()
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
                {songsData.length} songs
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
    paddingBottom: 140
  }
});
