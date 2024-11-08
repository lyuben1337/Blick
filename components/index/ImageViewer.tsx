import {
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { NeutralColor } from "@/constants/Colors";
import { PhotoIcon } from "@/components/shared/Icons";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import * as FileSystem from "expo-file-system";

type ImageViewerProps = {
  imageSrc?: string;
  isLoading?: boolean;
};

export function ImageViewer({ imageSrc, isLoading }: ImageViewerProps) {
  const { t } = useTranslation();
  const editLabelScale = useSharedValue(1);
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(0);

  const borderStyle: ViewStyle = {
    borderWidth: imageSrc && !isLoading ? 0 : 2,
  };

  const tapGesture = Gesture.LongPress()
    .onTouchesDown(() => {
      editLabelScale.value = 1.2;
      circleScale.value = 1;
      circleOpacity.value = 1;
    })
    .onFinalize(() => {
      editLabelScale.value = 1;
      circleScale.value = 0;
      circleOpacity.value = 0;
    })
    .maxDistance(100000);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(editLabelScale.value, { duration: 100 }) }],
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(circleScale.value, { duration: 200 }) }],
    opacity: withTiming(circleOpacity.value, { duration: 100 }),
  }));

  const onPress = () => {
    imageSrc &&
      router.navigate({
        pathname: "/edit",
        params: { imageSrc: encodeURIComponent(imageSrc) },
      });
  };

  return (
    <GestureDetector gesture={tapGesture}>
      <Pressable onPress={onPress} style={[styles.container, borderStyle]}>
        {imageSrc && !isLoading ? (
          <ImageBackground style={styles.image} source={{ uri: imageSrc }}>
            <View style={styles.editLabelContainer}>
              <Animated.View style={[styles.circle, circleStyle]} />
              <Animated.Text style={[animatedStyle, styles.editLabel]}>
                {t("home.edit")}
              </Animated.Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.placeholder}>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <PhotoIcon color={NeutralColor} />
            )}
          </View>
        )}
      </Pressable>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    borderStyle: "dashed",
    justifyContent: "center",
    borderColor: NeutralColor,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: "15%",
    marginHorizontal: "auto",
  },
  editLabelContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  editLabel: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "500",
    opacity: 0.7,
    textAlign: "center",
  },
  circle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    zIndex: -1,
  },
});
