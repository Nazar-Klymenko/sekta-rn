import React from "react";

import { Text, XStack, YStack } from "tamagui";

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({ icon, title, value }) => (
  <XStack alignItems="center" gap="$3">
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
    <YStack>
      <Text fontSize="$3" color="$gray10Light">
        {title}
      </Text>
      <Text fontSize="$4" fontWeight="bold">
        {value}
      </Text>
    </YStack>
  </XStack>
);
