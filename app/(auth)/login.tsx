import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const router = useRouter();
  const { next, prev } = useLocalSearchParams();

  const signIn = async () => {
    if (next) {
      router.replace(decodeURIComponent(next as string));
    } else {
      router.replace("/(tabs)");
    }
  };

  const handleCancel = () => {
    if (prev) {
      router.replace(decodeURIComponent(prev as string));
    } else {
      router.back();
    }
  };
  return (
    <View style={styles.container}>
      {/* {navigation.canGoBack() && (
        <Button title="Back" onPress={() => navigation.goBack()} />
      )} */}
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
      <Text style={styles.title}>prev:{prev}</Text>
      <Text style={styles.title}>next:{next}</Text>
      <Button title="Cancel" onPress={handleCancel} />
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
