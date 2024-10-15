import React from "react";

import { ScrollView, StackProps, YStack } from "tamagui";

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
}: PageContainerProps) {
  return (
    <ScrollView
      backgroundColor="$background"
      paddingHorizontal="$4"
      paddingVertical="40"
    >
      {children}
    </ScrollView>
  );
}
