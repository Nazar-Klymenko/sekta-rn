import React, { PropsWithChildren } from "react";
import { Spinner, Stack, StackProps, YStack, useTheme } from "tamagui";

export const FullPageLoading: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const theme = useTheme();

  const containerStyle: StackProps = {
    backgroundColor: theme.background.get(),
    minHeight: "100%",
    width: "100%",
    maxWidth: "100%",
    marginHorizontal: "auto",
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack
        {...containerStyle}
        flex={1}
        gap="$4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner color="$accentColor" size="large" />
        {children}
      </YStack>
    </YStack>
  );
};
