import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import BlobBackground from "../components/ui/BlobBackground";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <BlobBackground stage={2} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Chaos Clock</Text>
        <Text style={styles.subtitle}>Let’s log you in or get started!</Text>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => router.push("/auth/signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.push("/auth/signin")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: "JetBrainsMono_700Bold",
    color: Colors.hotPink,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "JetBrainsMono_700Bold",
    color: Colors.peach,
    textAlign: "center",
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: Colors.crimson,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonSecondary: {
    backgroundColor: Colors.royalBlue,
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
