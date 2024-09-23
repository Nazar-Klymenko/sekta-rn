import React from "react";

import { PageContainer } from "@/shared/components/layout/PageContainer";

import { Text, XStack, YStack } from "tamagui";

export default function TosScreen() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <Text fontSize="$6" fontWeight="bold">
          Terms of service - add later
        </Text>
        <XStack>
          <Text fontSize="$4">Tos itself</Text>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
