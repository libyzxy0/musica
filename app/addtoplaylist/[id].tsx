import {
  Pressable,
  StyleSheet
} from 'react-native';
import {
  Text,
  View
} from '@/components/Themed';
import {
  useLocalSearchParams
} from 'expo-router';
import {
  useAudio
} from '@/hooks/useAudio'
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddToPlaylist() {
  const {
    id
  } = useLocalSearchParams < {
    id: string
  } > ();
  const {
    audioFiles,
    allPlaylist
  } = useAudio();
  const songToAdd = (audioFiles.find(t => t.id === id));
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.foreground, opacity: pressed ? 0.5 : 1 }
      ]}
      onPress={() => {
        console.log(`Adding song to playlist: ${item.name}`);
      }}
    >
      <Text style={[styles.title, { color: colors.text }]}>{item.name}</Text>
      <Ionicons name="add-circle" size={24} color={colors.primary} />
    </Pressable>
  );

  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}
      >

      <FlatList
        data={allPlaylist}
        ListHeaderComponent={
        <View style={ {
          flex: 1,
          alignItems: 'center',
          marginBottom: 60
        }}>
          <Text style={ {
          fontFamily: 'Poppins-Bold',
            fontSize: 20,
            color: colors.text,
            marginBottom: 20
          }}>Select where playlist to add</Text>
          <Text style={ {
            fontFamily: 'Poppins-Bold',
            fontSize: 35,
            color: colors.primary
          }}>{songToAdd.title}</Text>
          <Text style={ {
            fontSize: 16,
            color: colors.secondary
          }}>{songToAdd.artist}</Text>
        </View>
        }
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={ {
          marginTop: 10,
          paddingHorizontal: 10,
          gap: 10,
        }}
        numColumns={1}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});