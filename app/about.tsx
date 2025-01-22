import { View, Text } from '@/components/Themed'
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Image } from 'expo-image';
import logo from '@/assets/images/adaptive-icon.png';
import { AntDesign } from '@expo/vector-icons';
import { ExternalLink } from '@/components/ExternalLink'
import { ScrollView } from 'react-native'

export default function About() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: colors.background
    }}>
      <View style={{
        marginTop: 20,
        alignItems: 'center'
      }}>
        <Image source={logo} style={{
          width: 200,
          height: 200
        }}/>
        <Text style={{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'Poppins-Regular',
        color: colors.secondary
      }}>Version 1.0.0</Text>
      </View>
      <View style={{
        marginHorizontal: 20,
        marginTop: 40,
        color: colors.text
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: 'Poppins-Bold',
          marginBottom: 10
        }}>About this App</Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Poppins-Regular'
        }}><Text style={{
          color: colors.primary
        }}>Musica</Text> is simple, efficient, and open-source <Text style={{
          color: colors.primary
        }}>music player</Text> designed for offline playback of music files stored on your device. With a clean and user-friendly interface, it offers an <Text style={{
          color: colors.primary
        }}>ad-free experience</Text>, letting you enjoy your favorite songs without interruptions.</Text>
      </View>
      <View style={{
        marginHorizontal: 20,
        marginTop: 20,
        color: colors.text
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: 'Poppins-Bold',
          marginBottom: 10
        }}>Developer/s</Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Poppins-Regular'
        }}>• Jan Liby Dela Costa <Text style={{
          color: colors.primary
        }}>App Developer</Text></Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Poppins-Regular'
        }}>• Marvin Quillo Saik <Text style={{
          color: colors.primary
        }}>Quality Assurance</Text></Text>
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 28,
        marginTop: 40
      }}>
        <ExternalLink href="https://github.com/libyzxy0">
          <AntDesign name="github" size={24} color={colors.primary}/>
        </ExternalLink>
        <ExternalLink href="https://github.com/libyzxy0/musica">
          <AntDesign name="codesquareo" size={24} color={colors.primary}/>
        </ExternalLink>
        <ExternalLink href="https://facebook.com/libyzxy0">
          <AntDesign name="facebook-square" size={24} color={colors.priamry}/>
        </ExternalLink>
      </View>
      <Text style={{fontSize: 12, textAlign: 'center', marginTop: 40, color: colors.secondary }}>Copyright © 2025, libyzxy0 All rights reserved.</Text>
    </ScrollView>
  )
}