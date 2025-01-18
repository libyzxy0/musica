import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, useThemeColor, Button } from "@/components/Themed";
import TabBarButton from "@/components/TabBarButton";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const TabBar = ({ state, descriptors, navigation }) => {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = Colors[theme];

  return (
    <View>
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
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPxfpMNgtsXINVS41LwNfUBj32xWxC9ZhxKRL6FW1ZGNnUktRyLkqS0Y2&s=10"
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
              {"Pag-Ibig"}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Regular",
                color: useThemeColor({}, "secondary"),
              }}
            >
              {"Sponge-cola"}
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
            accessibilityLabel="Shuffle"
          >
            <Ionicons name="heart-outline" size={24} color={colorFromProps.primary} />
          </Button>
          <Button
            buttonStyles={{
              padding: 0,
              backgroundColor: "transparent"
            }}
            accessibilityLabel="Shuffle"
          >
            <Ionicons name="play" size={24} color={colorFromProps.primary} />
          </Button>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={
          theme === "dark"
            ? ["rgba(0,0,0,0.7)", "rgba(0,0,0,0.7)"]
            : ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.3)"]
        }
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.tabbar}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;

          if (["_sitemap", "+not-found"].includes(route.name)) return null;

          const isFocused = state.index === index;
          const onPress = () => !isFocused && navigation.navigate(route.name);

          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              isFocused={isFocused}
              routeName={route.name}
              color={
                isFocused ? colorFromProps.primary : colorFromProps.secondary
              }
              label={label}
            />
          );
        })}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  },
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
});

export default TabBar;
