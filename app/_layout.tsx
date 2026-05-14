import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/AuthContext';


export const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Bricolage: require('../assets/fonts/MonaSans_Expanded-SemiBold.ttf'),
    Inter: require('../assets/fonts/MonaSans_Expanded-Light.ttf'),
    Poppins: require('../assets/fonts/MonaSans_Expanded-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ AUTH WRAPPER ADDED HERE */}
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(authentication)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(others)" />
          <Stack.Screen name="more" />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}