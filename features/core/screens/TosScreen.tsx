import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Paragraph, XStack, YStack } from "tamagui";

export default function TosScreen() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <Paragraph fontSize="$6" fontWeight="bold">
          Terms of service - add later
        </Paragraph>
        <XStack>
          <Paragraph fontSize="$4">Tos itself</Paragraph>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
