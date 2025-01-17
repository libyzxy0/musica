import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SongCard } from '@/components/SongCard'

export default function Songs() {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = Colors[theme];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header name="Songs" />
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>All Songs</Text>
          <Text style={{
            fontSize: 14,
            color: colorFromProps.secondary
          }}>46 songs</Text>
        </View>
        <View style={styles.buttonCon}>
          <Button
            contentContainerStyles={styles.buttonContent}
            buttonStyles={styles.shuffleButton}
            accessibilityLabel="Shuffle"
          >
            <Ionicons name="shuffle" size={32} color={colorFromProps.primary} />
          </Button>
          <Button
            contentContainerStyles={styles.buttonContent}
            buttonStyles={styles.playButton}
            accessibilityLabel="Play"
          >
            <Ionicons name="play" size={28} color="white" />
          </Button>
        </View>
      </View>
      <View style={styles.songsContainer}>
        <SongCard title="Dilaw" artist="Maki" image="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ef/55/f4/ef55f4c0-a905-2430-5e2a-e76182c96936/198588002179.jpg/592x592bb.webp" />
        <SongCard title="Ang Huling El Bimbo" artist="Ereaserheads" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3JSeZlXcWKZ81d_UBV_uEDIm4uBzGi2Rl0cjIKpg7A&s" />
        <SongCard title="With A Smile" artist="Ereaserheads" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjJ39oQaNb1v2c_rq3DoRIBXcnnn1I7em7A&s" />
        <SongCard title="Bagsakan" artist="Parokya Ni Edgar" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxVV3mM8ee2K9ME45NZSEh7PYvIIVSNewLw8ckd57vBw&s" />
        <SongCard title="Sila" artist="SUD" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1BrJ-bXlC-XeruRe12x-ptnx7We9rRZA7A&s" />
        <SongCard title="Pag-ibig" artist="Sponge-Cola" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPxfpMNgtsXINVS41LwNfUBj32xWxC9ZhxKRL6FW1ZGNnUktRyLkqS0Y2&s=10" />
        <SongCard title="Ikaw At Ako" artist="TJ Monterde" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqGeldb6kEww8YgYaHHIF4Tcc4MUWqm6zwg&s" />
        <SongCard title="Walang Iba" artist="Ezra Band" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqGeldb6kEww8YgYaHHIF4Tcc4MUWqm6zwg&s" />
        <SongCard title="Ang Huling El Bimbo" artist="Ereaserheads" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqGeldb6kEww8YgYaHHIF4Tcc4MUWqm6zwg&s" />
        <SongCard title="Ang Huling El Bimbo" artist="Ereaserheads" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqGeldb6kEww8YgYaHHIF4Tcc4MUWqm6zwg&s" />
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
    paddingHorizontal: 25,
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold'
  },
  buttonCon: {
    flexDirection: 'row',
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2.5
  },
  shuffleButton: {
    width: 50,
    height: 50,
    padding: 0,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songsContainer: {
    gap: 15
  }
});
