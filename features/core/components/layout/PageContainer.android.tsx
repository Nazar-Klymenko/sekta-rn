import React from "react";

import { Platform, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
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
  formContainer?: boolean;
  stickyBottom?: React.ReactNode;
}

export function PageContainer({
  children,
  scrollable = true,
  fullWidth = false,
  formContainer = false,
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
    ...(media.gtMd && !fullWidth && !formContainer && { maxWidth: 968 }),
    ...(media.gtLg && !fullWidth && !formContainer && { maxWidth: 968 }),
    marginHorizontal: "auto",
    ...stackProps,
  };
  const md = media.gtMd;

  const stickyBottomHeight = md ? 0 : 86;

  const content = (
    <YStack flex={1} {...containerStyle} paddingBottom={stickyBottom ? 16 : 0}>
      <YStack
        flex={1}
        padding={scrollable && !fullWidth ? "$4" : 0}
        gap="$4"
        paddingBottom={stickyBottom ? stickyBottomHeight : 0}
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
      paddingVertical="$4"
      display="flex"
      justifyContent="center"
    >
      {stickyBottom}
    </YStack>
  );

  return (
    <>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: "$4",
            backgroundColor: "$background",
          }}
          backgroundColor="$background"
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={Platform.OS === "web"}
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          alwaysBounceVertical
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {!md && stickyBottomComponent}
    </>
  );
}
