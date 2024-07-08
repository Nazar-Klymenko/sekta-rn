import { useAuth } from "@/hooks/useAuth";
import { useRouterPush } from "@/hooks/useRouterPush";

import { useRouter } from "expo-router";
import { Button, Text, View, useTheme } from "tamagui";

import { PageContainer } from "@/components/PageContainer";

export default function HomeScreen() {
  const theme = useTheme();

  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const Test = () => {
    if (user) {
      return <Text>Welcome, {user.email}</Text>;
    } else {
      return <Text>Please log in</Text>;
    }
  };

  return (
    <PageContainer>
      <Text>Home Screen</Text>
      <Test></Test>

      <Button onPress={() => router.push("/event")}>Go to Event</Button>
      <Button onPress={() => router.push("/event?id=123")}>
        Go to Event with ID
      </Button>
    </PageContainer>
  );
}
