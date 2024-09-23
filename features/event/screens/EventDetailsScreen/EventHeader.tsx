// components/EventHeader.tsx
import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";

import { ArrowLeft } from "@tamagui/lucide-icons";

import { useTheme } from "tamagui";
import { Stack as TamaguiStack } from "tamagui";

import { Stack, useRouter } from "expo-router";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface EventHeaderProps {
  scrollY: SharedValue<number>;
}

const EventHeader: React.FC<EventHeaderProps> = ({ scrollY }) => {
  const theme = useTheme();
  const router = useRouter();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      backgroundColor: "hsla(240, 7%, 8%, 1)",
    };
  });

  return (
    <Stack.Screen
      options={{
        headerBackground: () => (
          <Animated.View
            style={[StyleSheet.absoluteFill, headerAnimatedStyle]}
          />
        ),
        headerLeft: ({ canGoBack }) => (
          <TamaguiStack
            style={{
              backgroundColor: theme.background075.get(),
              borderWidth: 0,
              borderColor: theme.gray2Dark.get(),
              borderRadius: 20,
              padding: 6,
              marginHorizontal: 10,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity onPress={() => canGoBack && router.back()}>
              <ArrowLeft />
            </TouchableOpacity>
          </TamaguiStack>
        ),
      }}
    />
  );
};

export default EventHeader;
