import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { useVerifyEmail } from "@/features/profile/hooks/useVerifyEmail";

import { Mail } from "@tamagui/lucide-icons";

import { Paragraph, SizableText, Theme, XStack, YStack, styled } from "tamagui";

export const VerifyEmail = () => {
  const { user } = useAuth();
  const { mutate: sendVerification, isPending } = useVerifyEmail();

  if (!user || user.emailVerified) {
    return null;
  }
  return (
    <Theme name="surface1">
      <YStack
        backgroundColor="$background"
        padding="$4"
        borderRadius="$4"
        alignItems="flex-start"
        blockSize="border-box"
        gap="$4"
      >
        <YStack alignItems="flex-start" gap="$3">
          <XStack alignItems="center" gap="$3">
            <Mail size="$1" color="$color" />
            <SizableText size="$6" fontWeight={500}>
              Verify Your Email
            </SizableText>
          </XStack>
          <SizableText size="$5">
            Please verify your email address to access all features.
          </SizableText>
        </YStack>

        <ButtonCTA
          theme={"accent"}
          color="white"
          onPress={() => sendVerification()}
          isLoading={isPending}
          disabled={isPending}
        >
          Send Verification Email
        </ButtonCTA>
      </YStack>
    </Theme>
  );
};
