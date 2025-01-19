import Header from '@/components/Header'
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Text, View, Button, useThemeColor } from '@/components/Themed'
import { useAudio } from '@/hooks/useAudio'
export default function Artists() {
  const { id } = useLocalSearchParams();
  const { currentAudioPlaying } = useAudio()
  return (
    <SafeAreaView>
      <Text>{currentAudioPlaying.title}</Text>
    </SafeAreaView>
  )
}