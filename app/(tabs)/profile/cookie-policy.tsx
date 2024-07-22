import React from "react";

import { Text, XStack, YStack } from "tamagui";

import { PageContainer } from "@/components/layout/PageContainer";

export default function CookiePolicyScreen() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <Text fontSize="$6" fontWeight="bold">
          Cookie policy page - add later
        </Text>
        <XStack>
          <Text fontSize="$4">Policy itself</Text>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
