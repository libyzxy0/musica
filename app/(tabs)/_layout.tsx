import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'

const _layout = () => {
  return (
    <Tabs
        tabBar={props=> <TabBar {...props} />}
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
  )
}

export default _layout