import React, { useEffect } from "react";

import Animated from "react-native-reanimated";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Stack, StackProps } from "tamagui";

interface SkeletonProps extends StackProps {
  width?: number | string;
  height?: number | string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, ...props }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 }),
      ),
      -1, // infinite loop
      true, // reverse on each repeat
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    backgroundColor: "#999696", // replace with your theme variable if needed
  }));

  return (
    <Stack width={width} height={height} {...props} overflow="hidden">
      <Animated.View
        style={[animatedStyle, { width: "100%", height: "100%" }]}
      />
    </Stack>
  );
};

export default Skeleton;
