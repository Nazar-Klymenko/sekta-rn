import React from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { useVerifyEmail } from "@/features/profile/hooks/useVerifyEmail";

import { Mail } from "@tamagui/lucide-icons";

import { SizableText, XStack, YStack } from "tamagui";

export const VerifyEmail = () => {
  const { user } = useAuth();
  const { mutate: sendVerification, isPending } = useVerifyEmail();

  if (!user || user.emailVerified) {
    return null;
  }
  return (
    <YStack paddingVertical="$4">
      <YStack>
        <XStack alignItems="center">
          <Mail size="$1" marginEnd="$2.5" />
          <SizableText size="$6" fontWeight={600}>
            Verify Your Email
          </SizableText>
        </XStack>
        <SizableText size="$5" color="grey" marginBottom="$3">
          Please verify your email address to access all features.
        </SizableText>
      </YStack>

      <ButtonCTA
        theme={"accent"}
        onPress={() => sendVerification()}
        isLoading={isPending}
        disabled={isPending}
      >
        Send Verification Email
      </ButtonCTA>
    </YStack>
  );
};
