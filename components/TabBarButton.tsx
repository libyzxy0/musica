import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { AntDesign, Octicons, Feather } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

const icons = {
  playlist: props => <Octicons name="stack" size={24} {...props} />,
  index: props => <Feather name="music" size={24} {...props} />,
  artists: props => <AntDesign name="user" size={24} {...props} />
};

const TabBarButton = ({ isFocused, label, routeName, color, onPress }) => {
  const pathname = usePathname();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icons[routeName]?.({ color: routeName == "playlist" ? pathname == '/playlist-songs' ? colors.primary : color : color })}
      <Text style={[styles.label, { color: routeName == "playlist" ? pathname == '/playlist-songs' ? colors.primary : color : color }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontSize: 10,
    marginTop: 2
  }
});

export default TabBarButton;
