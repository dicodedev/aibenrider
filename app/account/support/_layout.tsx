import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="call" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
