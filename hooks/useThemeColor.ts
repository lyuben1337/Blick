/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props?: { light?: string; dark?: string },
) {
  const { theme } = useContext(ThemeContext);
  const systemTheme = useColorScheme() ?? "light";
  const selectedTheme = theme === "system" ? systemTheme : theme;

  if (props?.light && props?.dark) {
    return props[selectedTheme];
  } else {
    return Colors[selectedTheme][colorName];
  }
}
