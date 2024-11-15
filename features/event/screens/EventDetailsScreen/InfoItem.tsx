import React from "react";

import { Paragraph, XStack, YStack } from "tamagui";

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({ icon, title, value }) => (
  <XStack alignItems="center" gap="$3" flex={1}>
    <YStack
      width={50}
      height={50}
      borderRadius="$6"
      justifyContent="center"
      alignItems="center"
      backgroundColor="$backgroundHover"
      style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
    >
      {icon}
    </YStack>
    <YStack flex={1}>
      <Paragraph fontSize="$3" color="$gray10Light">
        {title}
      </Paragraph>
      <Paragraph fontSize="$4" fontWeight="bold" flexWrap="wrap" flexShrink={1}>
        {value}
      </Paragraph>
    </YStack>
  </XStack>
);
