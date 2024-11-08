import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactElement } from "react";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpecificIconProps } from "@/components/shared/Icons";

type ButtonProps = {
  label: string;
  icon?: ReactElement<SpecificIconProps>;
  onPress?: () => void;
  variant?: "primary";
  disabled?: boolean;
  style?: ViewStyle;
};

export default function ThemedButton({
  label,
  icon,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: ButtonProps) {
  const backgroundColor = useThemeColor(backgroundColorKeys[variant]);
  const textColor = useThemeColor(labelColorsKeys[variant]);

  const buttonStyle = [
    { backgroundColor: backgroundColor, opacity: disabled ? 0.5 : 1 },
    styles.button,
    style,
  ];
  const labelStyle = [styles.label, { color: textColor }];

  return (
    <Pressable style={buttonStyle} onPress={onPress} disabled={disabled}>
      {icon && (
        <View style={styles.iconContainer}>
          {React.cloneElement(icon, { color: textColor })}
        </View>
      )}
      <Text style={labelStyle}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  iconContainer: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

const backgroundColorKeys: {
  [key: string]: keyof typeof Colors.light & keyof typeof Colors.dark;
} = {
  primary: "buttonPrimary",
};

const labelColorsKeys: {
  [key: string]: keyof typeof Colors.light & keyof typeof Colors.dark;
} = {
  primary: "buttonLabelPrimary",
};
