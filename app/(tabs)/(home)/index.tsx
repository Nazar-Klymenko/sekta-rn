import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Event" onPress={() => router.push("/event")} />
      <Button
        title="Go to Event with ID"
        onPress={() => router.push("/event?id=123")}
      />
    </View>
  );
}
