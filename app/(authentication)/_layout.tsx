import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 400
    }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='onboarding' />
        <Stack.Screen name='account-type' />
        <Stack.Screen name='signin' />
        <Stack.Screen name='signup' />
        <Stack.Screen name='schools' />
        <Stack.Screen name='otp-verification' />
        <Stack.Screen name='forgot-password' />
    </Stack>
  )
}
