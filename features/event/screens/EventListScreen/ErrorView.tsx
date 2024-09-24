import React from "react";

import { RetryButton } from "@/features/core/components/buttons/IconButtons";

import { Paragraph, YStack } from "tamagui";

interface ErrorViewProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry }) => {
  return (
    <YStack flex={1} justifyContent="flex-start" alignItems="center">
      <Paragraph>Error: {error.message}</Paragraph>
      <RetryButton onPress={onRetry} size="lg" />
    </YStack>
  );
};
