import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { signIn as fireSignIn } from "@/services/auth";
export default function LoginScreen() {
  const router = useRouter();
  const { next } = useLocalSearchParams();

  const signIn = async () => {
    fireSignIn("test-rn@gmail.com", "qwertyuiop");

    if (next) {
      router.replace(decodeURIComponent(next as string));
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={signIn} />
      <Text style={styles.link} onPress={() => router.push("/(auth)/signup")}>
        Don't have an account? Sign up
      </Text>
      <Text
        style={styles.link}
        onPress={() => router.push("/(auth)/forgot-password")}
      >
        Forgot password?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: "blue",
    marginTop: 15,
  },
});
