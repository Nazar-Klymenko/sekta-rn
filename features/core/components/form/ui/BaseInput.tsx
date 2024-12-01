import { Input as TamaguiInput, styled } from "tamagui";

export const BaseInput = styled(TamaguiInput, {
  flex: 1,
  borderRadius: "$2",
  borderWidth: 2,
  minHeight: 54,
  fontSize: 16,
  paddingHorizontal: "$3.5",

  borderColor: "$gray7",
  outlineColor: "$accentBackground",

  variants: {
    hasError: {
      true: {
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
