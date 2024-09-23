import React, { useCallback, useEffect, useRef } from "react";

import { Platform, Pressable, StyleSheet, TextStyle, View } from "react-native";

import { ThemedText } from "@/shared/components/ThemedText";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

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
      <Animated.View ref={viewRef} style={[styles.container, animatedStyle]}>
        <ThemedText style={styles.text}>👋</ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
  },
  text: {
    fontSize: 40,
    lineHeight: 48,
    ...(Platform.OS === "android" ? { includeFontPadding: false } : {}),
  } as TextStyle,
});
