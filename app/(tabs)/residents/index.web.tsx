// app/(tabs)/play/index.tsx
import React from "react";
import { useResidents } from "@/hooks/useResidents";
import { ResidentCard } from "@/components/ResidentCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Text, YStack, XStack } from "tamagui";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FullPageLoading } from "@/components/layout/FullPageLoading";

export default function ResidentScreen() {
  const { data: residents, isLoading, error } = useResidents();

  if (isLoading) return <FullPageLoading />;
  if (error) {
    return (
      <PageContainer>
        <Text>Error loading residents</Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Text
        fontSize={40}
        fontWeight="bold"
        textAlign="center"
        marginBottom="$4"
      >
        Residents
      </Text>
      <XStack flexWrap="wrap" justifyContent="center" gap="$4">
        {residents?.map((resident, index) => (
          <Animated.View
            key={resident.id}
            entering={FadeInDown.delay(index * 100)}
          >
            <ResidentCard resident={resident} />
          </Animated.View>
        ))}
      </XStack>
    </PageContainer>
  );
}
