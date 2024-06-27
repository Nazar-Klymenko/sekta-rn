import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useRouterPush } from "@/hooks/useRouterPush";

export default function HomeScreen() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const routerPush = useRouterPush("/(tabs)/settings", {
    next: "settings",
    prev: "/",
  });
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

      <Button title="Go to settings" onPress={routerPush} />
      <Button title="Go to Event" onPress={() => router.push("/event")} />
      <Button
        title="Go to Event with ID"
        onPress={() => router.push("/event?id=123")}
      />
    </View>
  );
}
