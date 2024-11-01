import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { useVerifyEmail } from "@/features/profile/hooks/useVerifyEmail";

import { Mail } from "@tamagui/lucide-icons";

import { Paragraph, Theme, XStack, YStack, styled } from "tamagui";

export const VerifyEmail = () => {
  const { user } = useAuth();
  const { mutate: sendVerification, isPending } = useVerifyEmail();

  if (!user || user.emailVerified) {
    return null;
  }
  return (
    <Theme name="surface1">
      <YStack marginVertical="$2">
        <LinearGradient
          colors={["$accentBackground", "$blue8Light"]}
          start={[0, 0]}
          end={[1, 1]}
          borderRadius="$4"
          padding={2}
        >
          <YStack
            backgroundColor="$background"
            padding="$4"
            borderRadius="$3"
            alignItems="flex-start"
            blockSize="border-box"
            gap="$3"
          >
            <YStack alignItems="flex-start" gap="$3">
              <XStack alignItems="center" gap="$3">
                <Mail size="$1" color="$color" />
                <Paragraph size="$6" fontWeight={500}>
                  Verify Your Email
                </Paragraph>
              </XStack>
              <Paragraph fontSize="$5">
                Please verify your email address to access all features.
              </Paragraph>
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
        </LinearGradient>
      </YStack>
    </Theme>
  );
};
