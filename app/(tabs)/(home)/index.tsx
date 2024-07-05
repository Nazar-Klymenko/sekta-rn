import { View, Text, Button, useTheme } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useRouterPush } from "@/hooks/useRouterPush";

export default function HomeScreen() {
  const theme = useTheme();

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
    <View
      justifyContent="center"
      alignItems="center"
      flex={1}
      backgroundColor="$background"
    >
      <Text>Home Screen</Text>
      <Test></Test>

      <Button onPress={() => router.push("/event")}>Go to Event</Button>
      <Button onPress={() => router.push("/event?id=123")}>
        Go to Event with ID
      </Button>
    </View>
  );
}
