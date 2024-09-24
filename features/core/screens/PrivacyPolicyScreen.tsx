import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { SizableText, XStack, YStack } from "tamagui";

export default function PrivacyPolicyScreen() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <SizableText fontSize="$6" fontWeight="bold">
          Cookie and Privacy policy page - add later
        </SizableText>
        <XStack>
          <SizableText fontSize="$4">Policy itself</SizableText>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
