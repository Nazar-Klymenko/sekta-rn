import { AuthGuard } from "@/components/navigation/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { View, Text } from "tamagui";

export default function SettingsScreen() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthGuard>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        backgroundColor="$background"
      >
        <Text>Settings Screen</Text>
      </View>
    </AuthGuard>
  );
}
