import { View, Text, useThemeColor } from '@/components/Themed'
import { ScrollView } from 'react-native'

export default function Settings() {
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: useThemeColor({}, 'background'),
    }} contentContainerStyle={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{fontSize: 40, textAlign: 'center', color: useThemeColor({}, 'text') }}>I love you <Text style={{
        color: useThemeColor({}, 'primary')
      }}>R.....N</Text></Text>
      <Text style={{
        textAlign: 'center',
        marginHorizontal: 20,
        color: useThemeColor({}, 'secondary')
      }}>Ignore this message, settings page isn't finished yet 🤣</Text>
    </ScrollView>
  )
}