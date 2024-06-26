import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function EventScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Event Screen</Text>
      {id && <Text>Event ID: {id}</Text>}
    </View>
  );
}
