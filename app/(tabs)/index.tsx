import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";

export default function Index() {
  return <ThemedView></ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  footerContainer: {
    gap: 16,
    width: "100%",
  },
  editOptionsContainer: {
    marginHorizontal: "auto",
    gap: 48,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
