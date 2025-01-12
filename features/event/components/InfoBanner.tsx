import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { Paragraph, Theme, XStack, YStack } from "tamagui";

import { Info } from "@tamagui/lucide-icons";

export default function InfoBanner() {
  return (
    <Theme name="surface1">
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
            borderRadius="$3"
            alignItems="center"
          >
            <Info size={20} marginEnd="$3" />
            <YStack flex={1} minWidth={0}>
              <Paragraph paddingBottom="$1" fontSize="$6" fontWeight="700">
                Get a discount at the entrance!
              </Paragraph>
              <Paragraph lineHeight={15} fontSize="$3" color="$gray10Light">
                Click the attend button in the event and show it at the
                entrance!
              </Paragraph>
            </YStack>
          </XStack>
        </LinearGradient>
      </YStack>
    </Theme>
  );
}
