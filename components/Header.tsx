import { View, Text } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import logo from "@/assets/images/adaptive-icon.png";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Header({ name }: { name: string }) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return (
    <View style={styles.header}>
      <View transparent={true} style={styles.container}>
        <Text style={styles.headerTitle}>{name}</Text>
        <Link
          href="settings"
          asChild
          style={{
            marginRight: 20
          }}
        >
          <Pressable>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </Pressable>
        </Link>
        <Link href="about" asChild>
          <Pressable>
            <Image
              source={logo}
              placeholder={{ blurhash }}
              style={styles.logo}
            />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    flex: 1
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain"
  }
});
