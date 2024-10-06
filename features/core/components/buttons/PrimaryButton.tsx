import { LinearGradient } from "tamagui/linear-gradient";

import React, { forwardRef } from "react";

import { GestureResponderEvent, Platform } from "react-native";

import {
  ButtonText,
  GetProps,
  Spinner,
  Stack,
  TamaguiElement,
  XStack,
  styled,
} from "tamagui";

type ButtonFrameProps = GetProps<typeof Stack>;

interface PrimaryButtonProps extends ButtonFrameProps {
  text?: string;
  isLoading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const ButtonFrame = styled(Stack, {
  name: "ButtonFrame",
  tag: "button",
  backgroundColor: "transparent",
  borderRadius: "$6",
  overflow: "visible",
  minHeight: 54,
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  borderWidth: 0,

  ...(Platform.OS === "web"
    ? {
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
      }
    : {
        elevation: 3,
      }),

  hoverStyle: {
    opacity: 0.9,
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.20)",
        }
      : {
          elevation: 5,
        }),
  },

  focusStyle: {
    outlineColor: "$accentColor",
    outlineStyle: "solid",
    outlineWidth: 2,
  },

  pressStyle: {
    opacity: 0.8,
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
        }
      : {
          scale: 0.97,
          elevation: 2,
        }),
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
        ...(Platform.OS === "web"
          ? {
              boxShadow: "none",
            }
          : {
              elevation: 0,
            }),
      },
    },
  } as const,
});

const GradientContainer = styled(Stack, {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  borderRadius: "$6",
  backgroundColor: "$accentBackground",
});

export const PrimaryButton = forwardRef<TamaguiElement, PrimaryButtonProps>(
  ({ onPress, text, isLoading, children, disabled, ...props }, ref) => {
    return (
      <ButtonFrame
        {...props}
        ref={ref}
        onPress={onPress}
        disabled={disabled || isLoading}
      >
        <GradientContainer>
          {/* <LinearGradient
            colors={["$pink9Light", "$accentBackground"]}
            start={[0, 0]}
            end={[1, 1]}
            fullscreen
          /> */}
        </GradientContainer>
        <XStack gap="$2" alignItems="center" zIndex={1}>
          {isLoading && <Spinner color="$colorContrast" />}
          <ButtonText fontWeight={700} size="$7">
            {text} {children}
          </ButtonText>
        </XStack>
      </ButtonFrame>
    );
  },
);

PrimaryButton.displayName = "PrimaryButton";
