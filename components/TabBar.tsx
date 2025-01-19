import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, useThemeColor, Button } from "@/components/Themed";
import TabBarButton from "@/components/TabBarButton";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import FloatingPlayerWidget from '@/components/FloatingPlayerWidget'
import { useAudio } from '@/hooks/useAudio'

const TabBar = ({ state, descriptors, navigation }) => {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = Colors[theme];
  const { currentAudioPlaying } = useAudio()

  return (
    <View>
      {currentAudioPlaying && <FloatingPlayerWidget />}
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
  }
});

export default TabBar;
