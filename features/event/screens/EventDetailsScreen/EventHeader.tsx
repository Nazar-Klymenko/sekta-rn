import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";

import { ArrowLeft } from "@tamagui/lucide-icons";

import { useTheme } from "tamagui";
import { Stack as TamaguiStack } from "tamagui";

import { Stack, useNavigation } from "expo-router";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface EventHeaderProps {
  scrollY: SharedValue<number>;
  title?: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  scrollY,
  title = "Event",
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      backgroundColor: "black",
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [20, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTransparent: true,
        headerBlurEffect: "dark",
        headerBackground: () => (
          <Animated.View
            style={[StyleSheet.absoluteFill, headerAnimatedStyle]}
          />
        ),
        headerTitle: () => (
          <Animated.Text
            style={[
              {
                color: "orange",
                fontFamily: "LeagueSpartan_700Bold",
                fontSize: 25,
              },
              titleAnimatedStyle,
            ]}
          >
            {title}
          </Animated.Text>
        ),
      }}
    />
  );
};

export default EventHeader;
