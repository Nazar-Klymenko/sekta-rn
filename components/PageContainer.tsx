import React from "react";

import { ScrollView, ViewStyle } from "react-native";

import { Stack, StackProps, YStack, useMedia, useTheme } from "tamagui";

interface PageContainerProps extends Omit<StackProps, "children"> {
  children: React.ReactNode;
  scrollable?: boolean;
}
export function PageContainer({
  children,
  scrollable = true,
  style,
  ...stackProps
}: PageContainerProps) {
  const theme = useTheme();
  const media = useMedia();

  const containerStyle: StackProps = {
    backgroundColor: theme.background,
    minHeight: "100%",
    width: "100%",
    maxWidth: "100%",
    ...(media.gtXs && { maxWidth: 540 }),
    ...(media.gtSm && { maxWidth: 720 }),
    ...(media.gtMd && { maxWidth: 720 }),
    ...(media.gtLg && { maxWidth: 720 }),
    marginHorizontal: "auto",
    padding: "$4",
    ...stackProps,
  };

  const content = (
    <Stack {...containerStyle}>
      <YStack gap="$4" flex={1}>
        {children}
      </YStack>
    </Stack>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background.get() }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}
