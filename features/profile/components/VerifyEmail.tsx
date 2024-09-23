import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useVerifyEmail } from "@/features/profile/hooks/useVerifyEmail";

import { Mail } from "@tamagui/lucide-icons";

import { Text, XStack, YStack, styled } from "tamagui";

import { SecondaryButton } from "@/shared/components/buttons/SecondaryButton";

export const VerifyEmail = () => {
  const { user } = useAuth();
  const { mutate: sendVerification, isPending } = useVerifyEmail();

  if (!user || user.emailVerified) {
    return null;
  }
  return (
    <VerifyEmailContainer>
      <LinearGradient
        colors={["$green10Light", "$blue8Light"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <YStack alignItems="flex-start" gap="$3">
        <XStack alignItems="center" gap="$3">
          <Mail size={24} color="$yellow10Light" />
          <Text fontSize="$5" fontWeight="bold" color="$yellow10">
            Verify Your Email
          </Text>
        </XStack>
        <Text marginTop="$2" fontSize="$5">
          Please verify your email address to access all features.
        </Text>
      </YStack>

      <SecondaryButton
        color="white"
        marginTop="$3"
        onPress={() => sendVerification()}
        isLoading={isPending}
        disabled={isPending}
        text="Send Verification Email"
      />
    </VerifyEmailContainer>
  );
};
const VerifyEmailContainer = styled(YStack, {
  width: "100%",
  padding: "$4",
  borderRadius: "$6",
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "$borderColor",
  elevation: 5,
});
