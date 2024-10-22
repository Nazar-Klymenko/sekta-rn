import React from "react";

import { ScrollView, ScrollViewProps } from "tamagui";

type PageContainerProps = ScrollViewProps & {
  children: React.ReactNode;
};

export function PageContainer({
  children,
  ...scrollViewProps
}: PageContainerProps) {
  return (
    <ScrollView
      backgroundColor="$background"
      {...scrollViewProps}
      contentContainerStyle={{ padding: "$4" }}
    >
      {children}
    </ScrollView>
  );
}
