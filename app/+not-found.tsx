import { Link, Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { XStack, Text, View, YStack, Button, styled, useTheme } from "tamagui";

const StyledLink = styled(Button, {
  marginTop: "$4",
  paddingVertical: "$4",
});

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
        This screen doesn't exist.
      </Text>
      <Link href="/" replace>
        <Text>Go to home screen!</Text>
      </Link>
    </YStack>
  );
}
