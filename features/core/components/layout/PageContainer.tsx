import React from "react";

import { ScrollView, ScrollViewProps } from "tamagui";

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
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: "$4",
        ...(overflowHorizontal && { paddingHorizontal: 0 }),
      }}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
}
