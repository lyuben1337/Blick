import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import { ThemedView } from "@/components/shared/ThemedView";
import { Alert, Pressable, StyleSheet, Dimensions, Image } from "react-native";
import ImageParameterSlider from "@/components/edit/ImageParameterSlider";
import { useTranslation } from "react-i18next";
import { Surface } from "gl-react-expo";
import { Saturate } from "@/components/edit/Saturate";
import { ExitIcon, ExportIcon } from "@/components/shared/Icons";
import { NeutralColor } from "@/constants/Colors";
import { ThemedText } from "@/components/shared/ThemedText";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

export default function Index() {
  const { t } = useTranslation();
  const { imageSrc } = useLocalSearchParams<{ imageSrc: string }>();
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const surfaceRef = useRef<any>(null);

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const screenWidth = Dimensions.get("window").width - 20;
  const availableHeight = Dimensions.get("window").height - 72 - 108;

  useEffect(() => {
    if (imageSrc) {
      Image.getSize(
        imageSrc,
        (width, height) => {
          setImageWidth(width);
          setImageHeight(height);
        },
        (error) => {
          console.error("Failed to get image dimensions:", error);
        },
      );
    }
  }, [imageSrc]);

  const onExit = () => {
    Alert.alert(
      t("edit.exitConfirmation.title"),
      t("edit.exitConfirmation.message"),
      [
        { text: t("edit.exitConfirmation.cancel"), style: "cancel" },
        {
          text: t("edit.exitConfirmation.confirm"),
          onPress: () => router.navigate("/"),
        },
      ],
    );
  };

  const onExport = async () => {
    try {
      const result = await captureRef(surfaceRef.current, {
        format: "jpg",
        quality: 1,
        result: "tmpfile",
      });

      await Sharing.shareAsync(result);
    } catch (error) {
      alert("Error");
    }
  };

  let scaledWidth = imageWidth;
  let scaledHeight = imageHeight;

  if (imageWidth > 0 && imageHeight > 0) {
    const widthScale = screenWidth / imageWidth;
    const heightScale = availableHeight / imageHeight;
    const scale = Math.min(widthScale, heightScale, 1);

    scaledWidth = imageWidth * scale;
    scaledHeight = imageHeight * scale;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <Pressable onPress={onExit}>
            <ExitIcon size={18} color={NeutralColor} />
          </Pressable>
          <ThemedText type="defaultSemiBold">BLICK</ThemedText>
          <Pressable onPress={onExport}>
            <ExportIcon size={24} color={NeutralColor} />
          </Pressable>
        </ThemedView>
        {imageWidth > 0 && imageHeight > 0 && (
          <Surface
            style={{
              width: scaledWidth,
              height: scaledHeight,
              alignSelf: "center",
            }}
            ref={surfaceRef}
          >
            <Saturate contrast={contrast} brightness={brightness}>
              {{ uri: imageSrc }}
            </Saturate>
          </Surface>
        )}
        <ThemedView style={styles.footer}>
          <ImageParameterSlider
            label={t("edit.brightness")}
            value={brightness}
            onValueChange={setBrightness}
          />
          <ImageParameterSlider
            label={t("edit.contrast")}
            value={contrast}
            onValueChange={setContrast}
          />
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: 72,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    paddingTop: 24,
  },
  footer: {
    height: 108,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
