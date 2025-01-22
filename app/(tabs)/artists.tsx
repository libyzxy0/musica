import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/components/Themed";
import { useAudio } from "@/hooks/useAudio";
import dummyimage from "@/assets/images/placeholder-user.jpg";
import { Image } from "expo-image";
import { FlatList } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";


export default function Artists() {
  
  const { artistsList, currentAudioPlaying } = useAudio();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}
    >
      <Header name="Artists" />
      <FlatList
        data={artistsList}
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              alignItems: "start",
              marginHorizontal: 10,
              marginBottom: 5
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 19,
                color: colors.primary
              }}
            >
              {artistsList.length} Artists
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              gap: 13
            }}
          >
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: colors.foreground
              }}
              source={item.image ? { uri: item.image } : dummyimage}
            />
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Poppins-Bold",
                  color: colors.text
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.secondary
                }}
              >
                {item.totalSongs} song{item.totalSongs > 1 && "s"}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.name}
        contentContainerStyle={{
          marginTop: 20,
          paddingHorizontal: 10,
          gap: 25,
          paddingBottom: currentAudioPlaying ? 160 : 90
        }}
        numColumns={1}
      />

      
    </SafeAreaView>
  );
}
