import { Tabs } from "expo-router";
import { InfoIcon, PhotosIcon, SettingsIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: useThemeColor("tabIconSelected"),
        tabBarStyle: { backgroundColor: useThemeColor("background") },
        headerStyle: { backgroundColor: useThemeColor("background") },
        headerTitle: "Blick",
        headerShadowVisible: false,
        headerTitleStyle: { color: useThemeColor("text") },
        tabBarShowLabel: false,
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
