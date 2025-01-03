import React from "react";

import { Paragraph, YStack, useTheme } from "tamagui";

import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="$5"
      backgroundColor="$background"
      gap="$4"
    >
      <Stack.Screen
        options={{
          title: "Oops!",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Paragraph
        fontSize="$6"
        fontWeight="bold"
        textAlign="center"
        color="$color"
      >
        404: This page doesn't exist.
      </Paragraph>
      <Link href="/" replace>
        <Paragraph>Go to home screen!</Paragraph>
      </Link>
    </YStack>
  );
}
