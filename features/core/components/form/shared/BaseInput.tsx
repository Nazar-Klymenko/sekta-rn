import {
  Paragraph,
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
  styled,
  useTheme,
} from "tamagui";

export const BaseInput = styled(TamaguiInput, {
  flex: 1,
  borderRadius: "$2",
  outlineColor: "$accentBackground",
  borderColor: "$gray2Dark",
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
