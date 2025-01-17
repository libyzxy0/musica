import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed'
import TabBarButton from '@/components/TabBarButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors'

const TabBar = ({ state, descriptors, navigation }) => {
  
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = Colors[theme];

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;
        const onPress = () => !isFocused && navigation.navigate(route.name);

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? colorFromProps.primary : colorFromProps.secondary}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default TabBar;
