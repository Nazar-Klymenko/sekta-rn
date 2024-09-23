// components/EventHeader.tsx
import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";

import {
  LikeButton,
  ShareButton,
} from "@/shared/components/buttons/IconButtons";

import { ArrowLeft } from "@tamagui/lucide-icons";

import { XStack, useTheme } from "tamagui";
import { Stack as TamaguiStack } from "tamagui";

import { Stack, useRouter } from "expo-router";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface EventHeaderProps {
  optimisticIsLiked: boolean;
  handleLike: () => void;
  scrollY: SharedValue<number>;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  optimisticIsLiked,
  handleLike,
  scrollY,
}) => {
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
        headerRight: () => (
          <XStack columnGap="$2">
            <LikeButton
              isLiked={optimisticIsLiked}
              handleLike={handleLike}
              size="sm"
            />
            <ShareButton size="sm" />
          </XStack>
        ),
      }}
    />
  );
};

export default EventHeader;
