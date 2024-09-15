import { ChevronDown } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import Animated, {
  WithSpringConfig,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AnimatePresence, Button, Text, XStack, YStack, styled } from "tamagui";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 1,
  stiffness: 200,
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);
  const height = useSharedValue(0);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    rotation.value = withSpring(isOpen ? 0 : 180, springConfig);
    height.value = withSpring(isOpen ? 0 : 1, springConfig);
  };

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: height.value,
      height: height.value === 0 ? 0 : "auto",
    };
  });

  return (
    <YStack>
      <ResponsiveStack onPress={toggleOpen}>
        <XStack
          flex={1}
          alignItems="center"
          justifyContent="flex-start"
          gap="$3"
        >
          <Text fontSize="$6">{title}</Text>
        </XStack>
        <Animated.View style={chevronStyle}>
          <ChevronDown size="$1" color="$gray10Light" />
        </Animated.View>
      </ResponsiveStack>
      <AnimatePresence>
        {isOpen && (
          <Animated.View style={contentStyle}>
            <YStack>{children}</YStack>
          </Animated.View>
        )}
      </AnimatePresence>
    </YStack>
  );
};

const ResponsiveStack = styled(Button, {
  hoverStyle: {
    backgroundColor: "$transparent",
  },
  pressStyle: {
    backgroundColor: "$transparent",
  },
  padding: "$4",
  minHeight: "$6",
  borderRadius: "$6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  backgroundColor: "transparent",
  borderWidth: 0,
  marginBottom: 8,
  size: "$5",
});
