import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Pressable, Platform, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";

export function HelloWave() {
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
    <Pressable onPress={handleInteraction}>
      <Animated.View ref={viewRef} style={animatedStyle}>
        <ThemedText style={styles.text}>👋</ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    lineHeight: 32,
    marginTop: 6,
  },
});
