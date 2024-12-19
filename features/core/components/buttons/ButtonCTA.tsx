import React from "react";

import { GestureResponderEvent } from "react-native";

import { Button, ButtonProps, Spinner } from "tamagui";

interface ButtonCTAProps extends ButtonProps {
  isLoading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const ButtonCTA = ({
  onPress,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonCTAProps) => (
  <Button
    elevation={"$4"}
    onPress={onPress}
    disabled={disabled || isLoading}
    borderRadius="$2"
    size={"$5"}
    borderWidth={0}
    icon={isLoading ? <Spinner color="$color" /> : null}
    animation={{ type: "quickest" }}
    disabledStyle={{ opacity: 0.5 }}
    pressStyle={{ opacity: 0.9 }}
    {...props}
  >
    {children}
  </Button>
);

ButtonCTA.displayName = "ButtonCTA";
