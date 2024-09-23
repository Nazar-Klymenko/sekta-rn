import React from "react";

import { PageContainer } from "@/shared/components/layout/PageContainer";

import { Text, XStack, YStack } from "tamagui";

export default function PrivacyPolicyScreen() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <Text fontSize="$6" fontWeight="bold">
          Cookie and Privacy policy page - add later
        </Text>
        <XStack>
          <Text fontSize="$4">Policy itself</Text>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
