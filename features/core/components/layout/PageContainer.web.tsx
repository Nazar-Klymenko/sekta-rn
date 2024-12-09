import React from "react";

import { View, ViewProps } from "tamagui";

type PageContainerProps = ViewProps & {
  children: React.ReactNode;
};

export function PageContainer({ children, ...props }: PageContainerProps) {
  return (
    <View backgroundColor="$background" width={"100%"} minHeight={"100dvh"}>
      <View
        padding="$4"
        flex={1}
        {...props}
        maxWidth={1200}
        width={"100%"}
        marginHorizontal={"auto"}
        overflow="hidden"
        minHeight={"100dvh"}
      >
        {children}
      </View>
    </View>
  );
}
