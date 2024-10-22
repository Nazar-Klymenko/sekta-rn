import React from "react";

import { Button, ButtonProps, SizableText, Spinner, styled } from "tamagui";

interface PrimaryButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const StyledButton = styled(Button, {
  backgroundColor: "$accentBackground",
  borderRadius: "$9",
  pressStyle: { opacity: 0.8, scale: 0.97 },
  focusStyle: { outlineColor: "$accentColor", outlineWidth: 2 },
});

const StyledText = styled(SizableText, {
  fontWeight: "600",
  fontSize: "$7",
});

export const PrimaryButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  PrimaryButtonProps
>(({ onPress, isLoading, children, disabled, ...props }, ref) => (
  <StyledButton
    ref={ref}
    onPress={onPress}
    disabled={disabled || isLoading}
    opacity={disabled || isLoading ? 0.5 : 1}
    {...props}
  >
    {isLoading && <Spinner />}
    <StyledText>{children}</StyledText>
  </StyledButton>
));

PrimaryButton.displayName = "PrimaryButton";
