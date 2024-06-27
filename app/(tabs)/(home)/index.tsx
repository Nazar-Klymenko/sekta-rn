import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const Test = () => {
    if (user) {
      return <Text>Welcome, {user.email}</Text>;
    } else {
      return <Text>Please log in</Text>;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Test></Test>

      <Button
        title="Go to settings"
        onPress={() => router.replace("/(tabs)/settings")}
      />
      <Button title="Go to Event" onPress={() => router.push("/event")} />
      <Button
        title="Go to Event with ID"
        onPress={() => router.push("/event?id=123")}
      />
    </View>
  );
}
