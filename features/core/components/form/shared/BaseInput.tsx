import { Input as TamaguiInput, styled } from "tamagui";

export const BaseInput = styled(TamaguiInput, {
  flex: 1,
  size: "$5",
  borderRadius: "$2",
  borderColor: "transparent",
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
