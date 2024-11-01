import React, { PropsWithChildren } from "react";

import { Info } from "@tamagui/lucide-icons";

import { SizableText, XStack } from "tamagui";

export const Hint = ({ children }: PropsWithChildren) => {
  return (
    <XStack gap="$2" marginBottom="$4">
      <Info color="$gray10Light" size={16} alignSelf="center" />
      <SizableText fontSize="$3" color="$gray10Light">
        {children}
      </SizableText>
    </XStack>
  );
};
