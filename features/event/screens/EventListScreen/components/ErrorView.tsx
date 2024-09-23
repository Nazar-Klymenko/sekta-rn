import React from "react";

import { RetryButton } from "@/shared/components/buttons/IconButtons";

import { Text, YStack } from "tamagui";

interface ErrorViewProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry }) => {
  return (
    <YStack flex={1} justifyContent="flex-start" alignItems="center">
      <Text>Error: {error.message}</Text>
      <RetryButton onPress={onRetry} size="lg" />
    </YStack>
  );
};
