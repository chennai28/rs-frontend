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
}
