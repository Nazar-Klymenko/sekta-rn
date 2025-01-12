import React, { PropsWithChildren } from "react";

import { Spinner, YStack } from "tamagui";

export const FullPageLoading: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      <YStack
        flex={1}
        backgroundColor="$background"
        height="100%"
        width="100%"
        maxWidth="100%"
        marginHorizontal="auto"
        gap="$4"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner color="$accentColor" size="large" />
        {children}
      </YStack>
    </YStack>
  );
};
