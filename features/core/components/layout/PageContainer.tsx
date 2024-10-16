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
      paddingHorizontal={16}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
}
