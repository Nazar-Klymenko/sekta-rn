import React from "react";

import { ScrollView, ScrollViewProps, YStack } from "tamagui";

type PageContainerProps = ScrollViewProps & {
  children: React.ReactNode;
  overflowRight?: boolean;
};

export function PageContainer({
  children,
  padding,
  overflowRight = false,
  ...scrollViewProps
}: PageContainerProps) {
  return (
    <ScrollView
      backgroundColor="$background"
      contentContainerStyle={{
        gap: "$4",
        padding: "$4",
        ...(overflowRight && { paddingRight: 0 }),
      }}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
}
