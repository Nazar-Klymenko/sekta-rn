import React from "react";

import { Pressable } from "react-native";

import { Eye, EyeOff } from "@tamagui/lucide-icons";

import { styled } from "tamagui";
import { Circle, XStack, YStack } from "tamagui";

interface PasswordIconProps {
  onPress: () => void;
  isVisible: boolean;
}

export const PasswordIcon = ({ onPress, isVisible }: PasswordIconProps) => {
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <IconContainer>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isVisible ? "Hide password" : "Show password"}
        accessible={true}
      >
        <Circle
          theme={"surface2"}
          size={"$2"}
          backgroundColor="$background"
          pressStyle={{ backgroundColor: "$backgroundPress" }}
          onPress={onPress}
        >
          <Icon size={14} color="$color" />
        </Circle>
      </Pressable>
    </IconContainer>
  );
};

const IconContainer = styled(XStack, {
  position: "absolute",
  right: 12,
  pointerEvents: "auto",
  zIndex: 1,
  alignItems: "center",
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
});
