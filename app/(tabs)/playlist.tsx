import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { FlatList } from "react-native";
import { View, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const dataPlaylist = [
  { id: "1", title: "Playlist 1", number: "101" },
  { id: "2", title: "Playlist 2", number: "102" },
  { id: "3", title: "Playlist 3", number: "103" },
  { id: "4", title: "Playlist 4", number: "104" },
];

export default function Playlist() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <Header name="Playlist" />

      <FlatList
        data={dataPlaylist}
        ListHeaderComponent={
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 16,
              marginLeft: 10,
              color: colors.primary
            }}
          >
            My Playlist
          </Text>
        }
        renderItem={({ item }) => (
          <View
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
              {item.number} songs
            </Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          marginTop: 30,
          paddingHorizontal: 10,
          gap: 10,
          paddingBottom: 90
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-evenly"
        }}
      />
    </SafeAreaView>
  );
}
