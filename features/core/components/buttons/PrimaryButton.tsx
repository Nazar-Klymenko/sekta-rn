import React from "react";

import { GestureResponderEvent } from "react-native";

import { Button, ButtonProps, Paragraph, SizableText, Spinner } from "tamagui";

interface PrimaryButtonProps extends ButtonProps {
  text?: string;
  isLoading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const PrimaryButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  PrimaryButtonProps
>(({ onPress, text, isLoading, children, disabled, ...props }, ref) => (
  <Button
    ref={ref}
    onPress={onPress}
    disabled={disabled || isLoading}
    backgroundColor="$accentBackground"
    borderRadius="$9"
    opacity={disabled || isLoading ? 0.5 : 1}
    pressStyle={{ opacity: 0.8, scale: 0.97 }}
    focusStyle={{ outlineColor: "$accentColor", outlineWidth: 2 }}
    {...props}
  >
    {isLoading && <Spinner color="$colorContrast" />}
    <SizableText fontWeight="600" fontSize="$7">
      {text || children}
    </SizableText>
  </Button>
));

PrimaryButton.displayName = "PrimaryButton";
