import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { Info } from "@tamagui/lucide-icons";

import { Paragraph, XStack, YStack } from "tamagui";

export default function InfoBanner() {
  return (
    <YStack marginVertical="$2">
      <LinearGradient
        colors={["$pink9Light", "$accentBackground"]}
        start={[0, 0]}
        end={[1, 1]}
        borderRadius="$4"
        padding={2}
      >
        <XStack
          backgroundColor="$background"
          padding="$3"
          borderRadius="$3" // Slightly smaller to fit inside the gradient
          alignItems="center"
          blockSize="border-box"
        >
          <Info size={20} marginEnd="$3" />
          <YStack flex={1} minWidth={0}>
            <Paragraph paddingBottom="$1" fontSize="$6" fontWeight="700">
              Get a discount at the entrance!
            </Paragraph>
            <Paragraph lineHeight={15} fontSize="$3" color="$gray10Light">
              Click the attend button in the event and show it at the entrance!
            </Paragraph>
          </YStack>
        </XStack>
      </LinearGradient>
    </YStack>
  );
}
