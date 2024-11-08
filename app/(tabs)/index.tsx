import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/shared/ThemedView";
import ThemedButton from "@/components/shared/ThemedButton";
import { PhotoIcon } from "@/components/shared/Icons";
import { useTranslation } from "react-i18next";
import { ImageViewer } from "@/components/index/ImageViewer";

export default function Index() {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const pickImageAsync = async () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
    const result = await ImagePicker.launchImageLibraryAsync();
    setIsLoading(false);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ImageViewer isLoading={isLoading} imageSrc={image} />
      <ThemedButton
        icon={<PhotoIcon />}
        label={t("home.importPhoto")}
        style={{ width: "100%" }}
        onPress={pickImageAsync}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    gap: 16,
    padding: 16,
    paddingBottom: 72,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
