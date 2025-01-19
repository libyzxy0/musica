import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { useAudio } from "@/hooks/useAudio";
import { ActivityIndicator } from "react-native";
import { View,useThemeColor } from "@/components/Themed";

export default function _layout() {
  const { audiosLoaded } = useAudio();
  if (!audiosLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <ActivityIndicator color={useThemeColor({}, 'primary')} size="large" />
      </View>
    );
  }
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites"
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          title: "Playlist"
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Songs"
        }}
      />
      <Tabs.Screen
        name="artists"
        options={{
          title: "Artists"
        }}
      />
    </Tabs>
  );
}
