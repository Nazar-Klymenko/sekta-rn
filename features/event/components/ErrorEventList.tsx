import React from "react";

import { RefreshControl } from "react-native";

import { RetryButton } from "@/features/core/components/buttons/IconButtons";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Paragraph } from "tamagui";

interface ErrorScreenProps {
  errorMessage: string;
  isRefetching: boolean;
  onRetry: () => void;
  onRefresh: () => void;
}

export default function ErrorEventList({
  errorMessage,
  isRefetching,
  onRetry,
  onRefresh,
}: ErrorScreenProps) {
  return (
    <PageContainer
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Paragraph fontSize="$5" textAlign="center" color="$gray10Light">
        {errorMessage}
      </Paragraph>
      <RetryButton
        onPress={() => onRetry()}
        size="lg"
        isLoading={isRefetching}
        disabled={isRefetching}
      />
    </PageContainer>
  );
}
