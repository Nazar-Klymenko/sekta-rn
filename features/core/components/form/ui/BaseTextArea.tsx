import { TextArea as TamaguiTextArea, styled } from "tamagui";

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
