import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi! 👋</Text>
      <Text style={styles.subtitle}>Let’s Get Started with Chaos Clock</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontFamily: "JetBrainsMono_700Bold",
    color: Colors.hotPink,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "JetBrainsMono_700Bold",
    color: Colors.peach,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.crimson,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 18,
  },
});
