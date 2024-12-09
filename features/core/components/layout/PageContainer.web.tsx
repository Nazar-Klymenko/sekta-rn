import React from "react";

import { getTokens } from "@tamagui/core";

import { View, ViewProps, getMedia, useMedia, useTheme } from "tamagui";

type PageContainerProps = ViewProps & {
  children: React.ReactNode;
};

export function PageContainer({ children, ...props }: PageContainerProps) {
  const media = useMedia();
  const tok = getMedia();
  tok.sm;

  return (
    <View backgroundColor="$background" width={"100%"} minHeight={"100dvh"}>
      <View
        padding="$4"
        flex={1}
        maxWidth={1200}
        width={"100%"}
        marginHorizontal={"auto"}
        overflow="hidden"
        minHeight={"100dvh"}
        {...props}
      >
        {children}
      </View>
    </View>
  );
}
