import React from "react";

import { Text, XStack, YStack } from "tamagui";

import { PageContainer } from "@/components/PageContainer";

export default function Contact() {
  return (
    <PageContainer>
      <YStack gap="$2">
        <Text fontSize="$6" fontWeight="bold">
          Contact Us
        </Text>
        <XStack>
          <Text fontSize="$4">Phone: </Text>
          <Text fontSize="$4">+48 734 481 823</Text>
        </XStack>
        <XStack>
          <Text fontSize="$4">Email: </Text>
          <Text fontSize="$4">sektaselekta@gmail.com</Text>
        </XStack>
        <XStack>
          <Text fontSize="$4">instagram: </Text>
          <Text fontSize="$4">@sektaseletka</Text>
        </XStack>
        <XStack>
          <Text fontSize="$4">facebook: </Text>
          <Text fontSize="$4">link</Text>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
