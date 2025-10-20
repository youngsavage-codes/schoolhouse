import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name='(authentication)' />
    <Stack.Screen name='(tabs)' />
  </Stack>
}
