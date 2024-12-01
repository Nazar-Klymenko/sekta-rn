import React from "react";

import { SizableText, useTheme } from "tamagui";

interface MaxLengthProps {
  length: number;
  maxLength?: number;
}

export const MaxLength: React.FC<MaxLengthProps> = ({ length, maxLength }) => {
  const theme = useTheme();
  if (maxLength === undefined) {
    return null;
  }
  const isOverLimit = length > maxLength;
  const color = isOverLimit ? theme.red10Light.get() : theme.gray10Light.get();

  return (
    <SizableText fontSize="$2" color={color} alignSelf="center">
      {`${length} / ${maxLength}`}
    </SizableText>
  );
};
