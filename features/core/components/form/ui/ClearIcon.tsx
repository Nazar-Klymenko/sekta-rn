import React from "react";

import { Pressable } from "react-native";

import { X } from "@tamagui/lucide-icons";

import { styled } from "tamagui";
import { Circle, XStack } from "tamagui";

interface ClearIconProps {
  onPress: () => void;
  visible?: boolean;
}

export const ClearIcon = ({ onPress, visible = true }: ClearIconProps) => {
  if (!visible) return null;

  return (
    <IconContainer>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Clear input"
        accessible={true}
      >
        <Circle
          theme={"surface2"}
          size={"$2"}
          backgroundColor="$background"
          onPress={onPress}
          pressStyle={{ backgroundColor: "$backgroundPress" }}
        >
          <X size={14} color="$color" />
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
