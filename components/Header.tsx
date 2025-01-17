import { View, Text } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import logo from '@/assets/images/icon.png';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Header({ name }: { name: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>{name}</Text>
        <Image
          source={logo}
          placeholder={{ blurhash }}
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    flex: 1,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});