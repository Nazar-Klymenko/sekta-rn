import React, { useCallback, useEffect, useRef } from "react";

import { Platform, Pressable, View } from "react-native";

import { SizableText, styled, useTheme } from "tamagui";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const WaveContainer = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  width: 48,
  height: 48,
});

const WaveText = styled(SizableText, {
  fontSize: 40,
  lineHeight: 48,
});

export function HelloWave() {
  const theme = useTheme();
  const rotationAnimation = useSharedValue(0);
  const viewRef = useRef<View>(null);

  const animate = useCallback(
    (repetitions: number) => {
      rotationAnimation.value = withRepeat(
        withSequence(
          withTiming(25, { duration: 150 }),
          withTiming(0, { duration: 150 }),
        ),
        repetitions,
        false,
        () => {
          rotationAnimation.value = 0;
        },
      );
    },
    [rotationAnimation],
  );

  useEffect(() => {
    animate(4);
  }, [animate]);

  useEffect(() => {
    if (Platform.OS === "web" && viewRef.current) {
      const node = viewRef.current as unknown as HTMLDivElement;
      const handleMouseEnter = () => animate(2);
      node.addEventListener("mouseenter", handleMouseEnter);
      return () => node.removeEventListener("mouseenter", handleMouseEnter);
    }
  }, [animate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  const handleInteraction = useCallback(() => {
    animate(2);
  }, [animate]);

  return (
    <AnimatedPressable onPress={handleInteraction} style={animatedStyle}>
      <WaveContainer ref={viewRef}>
        <WaveText color={theme.color}>👋</WaveText>
      </WaveContainer>
    </AnimatedPressable>
  );
}
