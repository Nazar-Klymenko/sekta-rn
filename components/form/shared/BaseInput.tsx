import {
  styled,
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
} from "tamagui";

export const BaseInput = styled(TamaguiInput, {
  flex: 1,
  outlineColor: "$accentBackground",
  borderColor: "$borderColor",
  minHeight: 54,
  fontSize: 16,
  focusStyle: {
    outlineColor: "$accentBackground",
    borderColor: "$accentBackground",
  },
});
