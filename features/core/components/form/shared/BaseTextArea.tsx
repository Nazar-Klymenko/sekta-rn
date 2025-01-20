import { TextArea as TamaguiTextArea, styled } from "tamagui";

export const BaseTextArea = styled(TamaguiTextArea, {
  flex: 1,
  borderRadius: "$2",
  borderWidth: 0,
  minHeight: 64,
  fontSize: 26,
  fontWeight: 600,
  paddingHorizontal: "$3.5",

  borderColor: "$gray7",
  outlineColor: "$accentBackground",

  variants: {
    hasError: {
      true: {
        borderWidth: 2,
        borderColor: "$red10Light",
        hoverStyle: {
          borderColor: "$red10Dark",
        },
      },
    },
    isPaddedLeft: {
      true: {
        paddingHorizontal: "$8",
      },
    },
    disabled: {
      true: {
        color: "grey",
        opacity: 0.7,
      },
    },
  },

  focusStyle: {
    borderWidth: 2,
    outlineColor: "$accentBackground",
    borderColor: "$accentBackground",
  },

  hoverStyle: {
    borderWidth: 2,
    borderColor: "$gray8",
  },
});
