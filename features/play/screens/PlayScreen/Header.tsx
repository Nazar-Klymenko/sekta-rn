import React from "react";

import { StyleSheet } from "react-native";

import { useTheme } from "tamagui";

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

const Header: React.FC<EventHeaderProps> = ({ scrollY }) => {
  const theme = useTheme();
  const bg = theme.background.get();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      backgroundColor: bg,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [20, 0],
      Extrapolation.CLAMP
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
        headerTitle: (props) => (
          <Animated.Text
            style={[
              {
                color: theme.color.get(),

                fontFamily: "LeagueSpartan_700Bold",
                fontSize: 25,
              },
              titleAnimatedStyle,
            ]}
          >
            {props.children}
          </Animated.Text>
        ),
      }}
    />
  );
};

export default Header;
