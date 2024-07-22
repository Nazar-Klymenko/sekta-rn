import React from "react";

import { ScrollView, ViewStyle } from "react-native";

import {
  Spinner,
  Stack,
  StackProps,
  YStack,
  useMedia,
  useTheme,
} from "tamagui";

export function FullPageLoading() {
  const theme = useTheme();

  const containerStyle: StackProps = {
    backgroundColor: theme.background.get(),
    minHeight: "100%",
    width: "100%",
    maxWidth: "100%",
    marginHorizontal: "auto",
  };

  const content = (
    <YStack flex={1} backgroundColor="$background">
      <YStack
        {...containerStyle}
        flex={1}
        gap="$4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner color="$accentColor" size="large" />
      </YStack>
    </YStack>
  );

  return content;
}
