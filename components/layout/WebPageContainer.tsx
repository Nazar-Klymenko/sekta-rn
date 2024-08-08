import React from "react";

import { Platform } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  Stack,
  StackProps,
  View,
  YStack,
  useMedia,
  useTheme,
} from "tamagui";

export const WebPageContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  const media = useMedia();

  const md = media.gtMd;

  const stickyBottomHeight = md ? 0 : 70;

  return <View>{children}</View>;
};
