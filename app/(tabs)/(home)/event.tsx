import { View, Text, useTheme } from "tamagui";
import { useLocalSearchParams } from "expo-router";

export default function EventScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  return (
    <View
      justifyContent="center"
      alignItems="center"
      flex={1}
      backgroundColor="$background"
    >
      <Text>Event Screen</Text>
      {id && <Text>Event ID: {id}</Text>}
    </View>
  );
}
