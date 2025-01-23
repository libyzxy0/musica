import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import {
  useFonts
} from "expo-font";
import {
  Stack
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  StatusBar
} from "expo-status-bar";
import {
  useEffect
} from "react";
import "react-native-reanimated";
import {
  AudioProvider
} from "@/context/AudioContext";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import * as SystemUI from "expo-system-ui";
import {
  useAudio
} from "@/hooks/useAudio";
import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';

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
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const [loaded] = useFonts( {
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf")
  });

 

  /* Fix for white screen flash when navigating */
  SystemUI.setBackgroundColorAsync(colors.background);

  /*
  useSetupTrackPlayer({
    onLoad: () => console.log("Track player loaded") //Hide the splash
  })
  */

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  },
    [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme: DefaultTheme}>
      <AudioProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={ { headerShown: false }} />
          <Stack.Screen name="audioplayer" options={ { headerShown: false, animation: 'fade_from_bottom' }} />
          <Stack.Screen name="addtoplaylist/[id]" options={ { headerShown: true, title: "Add to Playlist", animation: 'fade' }} />
          <Stack.Screen
            name="about"
            options={ { headerShown: true, title: "About", animation: 'fade' }}
            />
          <Stack.Screen
            name="settings"
            options={ { headerShown: true, title: "Settings", animation: 'fade'  }}
            />
          <Stack.Screen name="+not-found" />

        </Stack>
        <StatusBar style="auto" />
      </AudioProvider>
    </ThemeProvider>
  );
}