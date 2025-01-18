import { View, Text, useThemeColor } from '@/components/Themed'
import { Image } from 'expo-image';
import logo from '@/assets/images/icon.png';
import { AntDesign } from '@expo/vector-icons';
import { ExternalLink } from '@/components/ExternalLink'
import { ScrollView } from 'react-native'

export default function About() {
  return (
    <ScrollView style={{
      flex: 1,
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
        color: useThemeColor({}, 'secondary')
      }}>Version 1.0.0</Text>
      </View>
      <View style={{
        marginHorizontal: 20,
        marginTop: 40,
        color: useThemeColor({}, 'text')
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
          color: useThemeColor({}, 'primary')
        }}>Musica</Text> is a simple and efficient <Text style={{
          color: useThemeColor({}, 'primary')
        }}>music player</Text> designed for <Text style={{
          color: useThemeColor({}, 'primary')
        }}>offline playback of music files</Text> stored on your device. With a clean and user-friendly interface, it offers an <Text style={{
          color: useThemeColor({}, 'primary')
        }}>ad-free</Text> experience, letting you enjoy your favorite songs without interruptions.</Text>
      </View>
      <View style={{
        marginHorizontal: 20,
        marginTop: 20,
        color: useThemeColor({}, 'text')
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
          color: useThemeColor({}, 'primary')
        }}>App Developer</Text></Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Poppins-Regular'
        }}>• Marvin Quillo Saik <Text style={{
          color: useThemeColor({}, 'primary')
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
          <AntDesign name="github" size={24} color={useThemeColor({}, 'primary')}/>
        </ExternalLink>
        <ExternalLink href="https://github.com/libyzxy0/musica">
          <AntDesign name="codesquareo" size={24} color={useThemeColor({}, 'primary')}/>
        </ExternalLink>
        <ExternalLink href="https://facebook.com/libyzxy0">
          <AntDesign name="facebook-square" size={24} color={useThemeColor({}, 'primary')}/>
        </ExternalLink>
      </View>
      <Text style={{fontSize: 12, textAlign: 'center', marginTop: 40, color: useThemeColor({}, 'secondary') }}>Copyright © 2025, libyzxy0 All rights reserved.</Text>
    </ScrollView>
  )
}