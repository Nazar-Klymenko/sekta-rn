import React from "react";

import { GestureResponderEvent } from "react-native";

import { Button, ButtonProps, Paragraph, SizableText, Spinner } from "tamagui";

interface ButtonCTAProps extends ButtonProps {
  text?: string;
  isLoading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const ButtonCTA = React.forwardRef<
  React.ElementRef<typeof Button>,
  ButtonCTAProps
>(({ onPress, text, isLoading, children, disabled, ...props }, ref) => (
  <Button
    ref={ref}
    onPress={onPress}
    disabled={disabled || isLoading}
    backgroundColor="$purple10Light"
    borderRadius="$2"
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

ButtonCTA.displayName = "ButtonCTA";
