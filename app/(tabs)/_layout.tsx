import { Tabs } from "expo-router";
import { InfoIcon, PhotosIcon, SettingsIcon } from "@/components/Icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <PhotosIcon size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ color }) => <InfoIcon size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
