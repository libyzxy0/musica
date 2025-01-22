/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Pressable } from "react-native";
import React from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = { transparent?: boolean } & ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color, fontFamily: "Poppins-Regular" }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor: props.transparent ? 'transparent' : backgroundColor }, style]} {...otherProps} />;
}

type AppButtonProps = {
  disabled: boolean;
  buttonStyles: string;
  textStyles: string;
  onPress: () => {};
  accessibilityLabel: string;
  children: React.ReactNode;
}

type ButtonProps = {
  disabled?: boolean;
  buttonStyles?: ViewStyle | ViewStyle[];
  contentContainerStyles?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  accessibilityLabel?: string;
  children?: React.ReactNode;
};

export function Button({
  disabled = false,
  buttonStyles = {},
  contentContainerStyles = {},
  onPress,
  accessibilityLabel = "A Button",
  children,
}: ButtonProps) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = Colors[theme];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonBase,
        {
          backgroundColor: disabled
            ? "#980c34"
            : colorFromProps.primary,
          opacity: pressed ? 0.8 : 1,
        },
        buttonStyles,
      ]}
      disabled={disabled}
      onPress={onPress}
      accessible
      accessibilityLabel={accessibilityLabel}
    >
      <DefaultView style={[styles.contentContainer, contentContainerStyles]}>
        {children}
      </DefaultView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    padding: 8,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    flexDirection: 'row',
  },
  contentContainer: {
   flex: 1
  },
});
