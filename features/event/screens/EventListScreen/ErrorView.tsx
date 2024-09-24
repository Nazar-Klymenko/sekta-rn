import React from "react";

import { RetryButton } from "@/features/core/components/buttons/IconButtons";

import { SizableText, YStack } from "tamagui";

interface ErrorViewProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry }) => {
  return (
    <YStack flex={1} justifyContent="flex-start" alignItems="center">
      <SizableText>Error: {error.message}</SizableText>
      <RetryButton onPress={onRetry} size="lg" />
    </YStack>
  );
};
