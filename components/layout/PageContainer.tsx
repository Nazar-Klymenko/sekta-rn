import React from "react";

import { Platform, View } from "react-native";

import {
  ScrollView,
  Stack,
  StackProps,
  YStack,
  useMedia,
  useTheme,
} from "tamagui";

interface PageContainerProps extends Omit<StackProps, "children"> {
  children: React.ReactNode;
  scrollable?: boolean;
  fullWidth?: boolean;
}

export function PageContainer({
  children,
  scrollable = true,
  fullWidth = false,
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
    ...(media.gtXs && !fullWidth && { maxWidth: 540 }),
    ...(media.gtSm && !fullWidth && { maxWidth: 720 }),
    ...(media.gtMd && !fullWidth && { maxWidth: 720 }),
    ...(media.gtLg && !fullWidth && { maxWidth: 720 }),
    marginHorizontal: "auto",
    ...stackProps,
  };

  const content = (
    <YStack height="100%" flex={1} backgroundColor="$background">
      <YStack
        {...containerStyle}
        flex={1}
        padding={scrollable && !fullWidth ? "$4" : 0}
        gap="$4"
      >
        {children}
      </YStack>
    </YStack>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background.get() }}
        contentContainerStyle={{ flexGrow: 1, minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={Platform.OS == "web"}
      >
        <View style={{ flexGrow: 1 }}>{content}</View>
      </ScrollView>
    );
  }

  return content;
}
