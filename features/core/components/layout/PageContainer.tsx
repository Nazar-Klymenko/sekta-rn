import React from "react";

import { ScrollView, ScrollViewProps, YStack } from "tamagui";

type PageContainerProps = ScrollViewProps & {
  children: React.ReactNode;
  overflowHorizontal?: boolean;
};

export function PageContainer({
  children,
  padding,
  overflowHorizontal = false,
  ...scrollViewProps
}: PageContainerProps) {
  return (
    <ScrollView
      backgroundColor="$background"
      contentContainerStyle={{
        gap: "$4",
        padding: "$4",
        ...(overflowHorizontal && { paddingHorizontal: 0 }),
      }}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
}
