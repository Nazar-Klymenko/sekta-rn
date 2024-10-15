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
    width: "100%",
    maxWidth: "100%",
    minHeight: "100dvh",
    ...(media.gtXs && !fullWidth && { maxWidth: 540 }),
    ...(media.gtSm && !fullWidth && { maxWidth: 744 }),
    ...(media.gtMd && !fullWidth && !formContainer && { maxWidth: 968 }),
    ...(media.gtLg && !fullWidth && !formContainer && { maxWidth: 968 }),
    marginHorizontal: "auto",
    ...stackProps,
  };
  const md = media.gtMd;

  const content = (
    <YStack flex={1} {...containerStyle} paddingBottom={0}>
      <YStack
        flex={1}
        padding={scrollable && !fullWidth ? "$4" : 0}
        gap="$4"
        paddingBottom={0}
      >
        {children}
      </YStack>
    </YStack>
  );

  return <>{content}</>;
}
