import { TextArea as TamaguiTextArea, styled } from "tamagui";

export const BaseTextArea = styled(TamaguiTextArea, {
  flex: 1,
  size: "$5",
  borderRadius: "$2",
  borderColor: "transparent",
  minHeight: 64,

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
    outlineColor: "$accentBackground",
    borderColor: "$accentBackground",
  },

  hoverStyle: {
    borderColor: "$gray8",
  },
});
