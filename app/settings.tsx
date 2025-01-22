import { View, Text, useThemeColor } from '@/components/Themed'
import { ScrollView } from 'react-native'

export default function Settings() {
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: useThemeColor({}, 'background')
    }}>
      <Text style={{fontSize: 40, textAlign: 'left', marginTop: 40, color: useThemeColor({}, 'text') }}>Putanginaaaaaaa mo pre</Text>
    </ScrollView>
  )
}