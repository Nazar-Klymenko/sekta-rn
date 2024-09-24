// @/features/core/components/navigation/CustomTabBar.tsx
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import React from "react";

import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

import { Paragraph, useTheme } from "tamagui";

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme();

  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          backgroundColor: theme.background.get(),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const Icon = options.tabBarIcon;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : undefined}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {Icon &&
              Icon({
                color: isFocused ? theme.color.get() : theme.gray9Light.get(),
                size: 24,
                focused: isFocused,
              })}
            <Paragraph
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? theme.color.get() : theme.gray9Light.get(),
                },
              ]}
            >
              {label as string}
            </Paragraph>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
