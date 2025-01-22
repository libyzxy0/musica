import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { View } from "@/components/Themed";

export default function _layout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
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
