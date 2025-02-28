import { Stack } from "expo-router";

export default function ProgramsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="programs" />
    </Stack>
  );
}
