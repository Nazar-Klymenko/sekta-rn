import React from "react";

import { ScrollView, ViewStyle } from "react-native";

import { Stack, StackProps, YStack, useMedia, useTheme } from "tamagui";

interface PageContainerProps extends Omit<StackProps, "children"> {
  children: React.ReactNode;
  scrollable?: boolean;
}
export function FlatlistContainer({
  children,
  style,
  ...stackProps
}: PageContainerProps) {
  const theme = useTheme();
  const media = useMedia();

  const containerStyle: StackProps = {
    backgroundColor: theme.background.get(),
    minHeight: "100%",
    width: "100%",
    maxWidth: "100%",
    marginHorizontal: "auto",
    ...stackProps,
  };

  const content = (
    <YStack flex={1} backgroundColor="$background">
      <YStack {...containerStyle} flex={1} gap="$4">
        {children}
      </YStack>
    </YStack>
  );

  return content;
}
