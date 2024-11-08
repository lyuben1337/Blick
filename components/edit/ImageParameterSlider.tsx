import Slider, { SliderProps } from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { NeutralColor, PrimaryColor } from "@/constants/Colors";
import React from "react";

type ThemedSliderProps = {
  label: string;
  value: number;
  onValueChange?: (value: number) => void;
};

export default function ImageParameterSlider({
  label,
  value,
  onValueChange,
}: ThemedSliderProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.sliderTitle} type="defaultSemiBold">
        {label}
      </ThemedText>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={PrimaryColor}
        maximumTrackTintColor={NeutralColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    flex: 2,
  },
  sliderTitle: {
    width: 92,
  },
});
