import { useEffect } from "react";

import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { View } from "tamagui";

export const SkeletonEventCard = () => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(animatedValue.value, [0, 1], [-300, 300]) },
    ],
  }));

  return (
    <View style={styles.card}>
      <View style={styles.imageplaceholder} />
      <View style={styles.content}>
        <View style={styles.titleplaceholder} />
        <View style={styles.textplaceholder} />
        <View style={styles.textplaceholder} />
      </View>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={["transparent", "rgba(255, 255, 255, 0.3)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    margin: 16,
  },
  imageplaceholder: {
    height: 200,
    backgroundColor: "#3a3a3a",
  },
  content: {
    padding: 16,
  },
  titleplaceholder: {
    height: 24,
    backgroundColor: "#3a3a3a",
    marginBottom: 8,
    width: "80%",
  },
  textplaceholder: {
    height: 16,
    backgroundColor: "#3a3a3a",
    marginBottom: 8,
    width: "100%",
  },
});
