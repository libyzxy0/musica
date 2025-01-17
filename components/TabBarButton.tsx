import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed'
import { AntDesign, Octicons, Feather } from '@expo/vector-icons';

const icons = {
  favorites: (props) => <AntDesign name="staro" size={24} {...props} />,
  playlist: (props) => <Octicons name="stack" size={24} {...props} />,
  index: (props) => <Feather name="music" size={24} {...props} />,
  artists: (props) => <AntDesign name="user" size={24} {...props} />,
};

const TabBarButton = ({ isFocused, label, routeName, color, onPress }) => (
  <Pressable style={styles.container} onPress={onPress}>
    {icons[routeName]?.({ color })}
    <Text style={[styles.label, { color }]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default TabBarButton;
