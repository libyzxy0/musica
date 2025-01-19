import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { AudioProvider } from "@/context/AudioContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from '@/components/Themed'
import * as SystemUI from 'expo-system-ui';
import { useAudio } from '@/hooks/useAudio'
/*
import TrackPlayer from 'react-native-track-player'
import { playbackService } from '@/utils/playbackService'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
*/

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/*TrackPlayer.registerPlaybackService(() => playbackService)*/

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf")
  });
  
  /* Fix for white screen flash when navigating */
  SystemUI.setBackgroundColorAsync(useThemeColor({}, 'background'))
  
  /*
  useSetupTrackPlayer({
    onLoad: () => console.log("Track player loaded") //Hide the splash
  })
  */
  
  
  
  useEffect(() => {
    if(loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AudioProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="audioplayer"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="about"
            options={{ headerShown: true, title: "About" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AudioProvider>
    </ThemeProvider>
  );
}
