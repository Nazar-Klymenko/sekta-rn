import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Paragraph, XStack, YStack } from "tamagui";

export default function PrivacyPolicyScreen() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <Paragraph fontSize="$6" fontWeight="bold">
          Cookie and Privacy policy page - add later
        </Paragraph>
        <XStack>
          <Paragraph fontSize="$4">Policy itself</Paragraph>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
