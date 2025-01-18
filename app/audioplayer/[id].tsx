import Header from '@/components/Header'
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Themed'
export default function Artists() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>Hello World ID: {id}</Text>
    </SafeAreaView>
  )
}