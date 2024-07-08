import { useLocalSearchParams } from "expo-router";
import { Text, View, useTheme } from "tamagui";

import { PageContainer } from "@/components/PageContainer";

export default function EventScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  return (
    <PageContainer>
      <Text>Event Screen</Text>
      {id && <Text>Event ID: {id}</Text>}
    </PageContainer>
  );
}
