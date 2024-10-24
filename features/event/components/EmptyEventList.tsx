import React from "react";

import { MoreVertical } from "@tamagui/lucide-icons";

import { Paragraph, YStack } from "tamagui";

interface EmptyEventListProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const EmptyEventList: React.FC<EmptyEventListProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      paddingVertical="$8"
      gap="$4"
    >
      <Icon size={100} color="$gray8Light" />

      <Paragraph fontSize="$6" fontWeight="600" textAlign="center">
        {title}
      </Paragraph>

      <Paragraph fontSize="$5" textAlign="center" color="$gray10Light">
        {description}
      </Paragraph>
    </YStack>
  );
};

export default EmptyEventList;
