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
  stickyBottom?: React.ReactNode;
}

export function PageContainer({
  children,
  scrollable = true,
  fullWidth = false,
  stickyBottom,
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
    ...(media.gtSm && !fullWidth && { maxWidth: 744 }),
    ...(media.gtMd && !fullWidth && { maxWidth: 968 }),
    ...(media.gtLg && !fullWidth && { maxWidth: 968 }),
    marginHorizontal: "auto",
    ...stackProps,
  };
  const md = media.gtMd;

  const stickyBottomHeight = md ? 0 : 70;

  const content = (
    <YStack flex={1} {...containerStyle} paddingBottom={stickyBottom ? 16 : 0}>
      <YStack
        flex={1}
        padding={scrollable && !fullWidth ? "$4" : 0}
        gap="$4"
        paddingBottom={stickyBottom ? stickyBottomHeight : "$4"}
      >
        {children}
      </YStack>
    </YStack>
  );

  const stickyBottomComponent = stickyBottom && (
    <YStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      height={stickyBottomHeight}
      backgroundColor="$background"
      borderTopWidth={1}
      borderTopColor="$borderColor"
      padding="$3"
    >
      {stickyBottom}
    </YStack>
  );

  return (
    <YStack flex={1} backgroundColor="$background">
      {scrollable ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={Platform.OS === "web"}
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {!md && stickyBottomComponent}
    </YStack>
  );
}
