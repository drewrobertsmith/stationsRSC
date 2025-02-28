import { Tabs } from "expo-router";
import TabBarBackground from "@/components/ui/tab-bar-background";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Stations" }} />
      <Tabs.Screen
        name="(programs)"
        options={{
          title: "Programs",
        }}
      />
    </Tabs>
  );
}
