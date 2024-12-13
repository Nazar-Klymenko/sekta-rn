import { Input as TamaguiInput, styled } from "tamagui";

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
