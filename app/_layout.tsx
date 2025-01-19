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

import { useAudio } from '@/hooks/useAudio'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {audiosLoaded,getAllAudioFiles,getPermissions} = useAudio()
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf")
  });
  useEffect(() => {
    const rn = async () => {
      await getPermissions();
      await getAllAudioFiles();
    }
    rn();
  }, [])
  
  
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
            name="audioplayer/[id]"
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
