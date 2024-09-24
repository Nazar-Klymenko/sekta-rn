import { Button, Text, View, XStack, YStack, styled, useTheme } from "tamagui";

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
      <Text fontSize="$6" fontWeight="bold" textAlign="center" color="$color">
        404: This page doesn't exist.
      </Text>
      <Link href="/" replace>
        <Text>Go to home screen!</Text>
      </Link>
    </YStack>
  );
}
