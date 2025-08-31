<<<<<<< HEAD
import { JetBrainsMono_700Bold, useFonts } from "@expo-google-fonts/jetbrains-mono";
import AppLoading from "expo-app-loading";
import { Slot } from "expo-router";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    JetBrainsMono_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Slot />;
=======
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
>>>>>>> ef25bfdabd706f857cdfeb86fb3242632db1aa38
}
