import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { H1, Paragraph, YStack } from "tamagui";

import { Link } from "expo-router";

export default function ForgotPasswordSuccessScreen() {
  return (
    <PageContainer>
      <H1 fontWeight="bold" textAlign="center">
        Email sent! Check you inbox and follow the instuctions to reset your
        password
      </H1>
      <YStack alignItems="center" padding="$4" gap="$4">
        <Link href={`/auth/login`}>
          <Paragraph color="$accentColor" textAlign="center">
            Go back to login
          </Paragraph>
        </Link>
      </YStack>
    </PageContainer>
  );
}
