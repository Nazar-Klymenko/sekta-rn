import React from "react";

import {
  Paragraph,
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
  TextArea as TamaguiTextArea,
  styled,
  useTheme,
} from "tamagui";

export const BaseInput = styled(TamaguiInput, {
  flex: 1,
  borderRadius: "$2",
  borderWidth: 2,
  outlineColor: "$accentBackground",
  minHeight: 54,
  fontSize: 16,
  focusStyle: {
    outlineColor: "$accentBackground",
    borderColor: "$accentBackground",
  },
});
export const BaseTextArea = styled(TamaguiTextArea, {
  flex: 1,
  borderRadius: "$2",
  borderWidth: 2,
  outlineColor: "$accentBackground",
  minHeight: 54,
  fontSize: 16,
  focusStyle: {
    outlineColor: "$accentBackground",
    borderColor: "$accentBackground",
  },
});

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
    <Paragraph fontSize="$2" color={color}>
      {`${length} / ${maxLength}`}
    </Paragraph>
  );
};
