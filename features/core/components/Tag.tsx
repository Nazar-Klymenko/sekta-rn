import React from "react";

import { Paragraph, XStack, styled, useTheme } from "tamagui";

interface TagProps {
  tag: string;
  onPress?: () => void;
  selected?: boolean;
  icon?: React.ReactNode;
}

export const Tag = ({ tag, onPress, selected, icon }: TagProps) => {
  const theme = useTheme();

  return (
    <XStack
      borderRadius="$9"
      borderWidth={2}
      borderColor={selected ? "$accentBackground" : theme.orange9Light.get()}
      paddingVertical="$3"
      paddingHorizontal="$4"
      backgroundColor={selected ? "$accentBackground" : "transparent"}
      onPress={onPress}
      cursor={selected ? "pointer" : "unset"}
    >
      <Paragraph lineHeight="$1" color="$color" fontWeight="800" fontSize="$5">
        {tag}
      </Paragraph>
      {icon}
    </XStack>
  );
};
