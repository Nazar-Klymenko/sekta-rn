import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { SizableText, XStack, YStack } from "tamagui";

export default function TosScreen() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <SizableText fontSize="$6" fontWeight="bold">
          Terms of service - add later
        </SizableText>
        <XStack>
          <SizableText fontSize="$4">Tos itself</SizableText>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
