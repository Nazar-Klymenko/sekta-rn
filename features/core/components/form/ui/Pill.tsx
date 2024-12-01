import React, { useId, useState } from "react";

import {
  Circle,
  Paragraph,
  InputProps as TamaguiInputProps,
  XStack,
} from "tamagui";

interface PillProps {
  tag: string;
  onPress?: () => void;
  selected?: boolean;
  icon?: React.ReactNode;
}

export const Pill = ({ tag, onPress, selected, icon }: PillProps) => {
  return (
    <XStack
      theme={"surface3"}
      gap="$2"
      borderRadius="$9"
      paddingVertical="$1"
      paddingHorizontal="$2"
      backgroundColor={"$background"}
      onPress={onPress}
      cursor={selected ? "pointer" : "unset"}
      alignItems="center"
      justifyContent="space-between"
    >
      <Paragraph
        lineHeight="$1"
        color="$accentColor"
        fontWeight="400"
        fontSize={"$5"}
      >
        {tag}
      </Paragraph>
      <Circle size={"$1"}>{icon}</Circle>
    </XStack>
  );
};
