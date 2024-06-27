import { AuthGuard } from "@/components/navigation/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { useNavigationTracker } from "@/hooks/useNavigationTracker";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  const { isLoggedIn } = useAuth();
  const { prevRoute } = useNavigationTracker();

  return (
    <AuthGuard>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings Screen</Text>
      </View>
    </AuthGuard>
  );
}
