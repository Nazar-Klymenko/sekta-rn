import { AuthGuard } from "@/components/navigation/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthGuard>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings Screen</Text>
      </View>
    </AuthGuard>
  );
}
