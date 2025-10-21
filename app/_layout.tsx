import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Bricolage: require('../assets/fonts/Quicksand-SemiBold.ttf'),
    Inter: require('../assets/fonts/Quicksand-Light.ttf'),
    Poppins: require('../assets/fonts/Quicksand-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // You can replace this with a splash or loader if preferred
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(authentication)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
