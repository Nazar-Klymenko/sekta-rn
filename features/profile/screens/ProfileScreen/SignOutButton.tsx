import React, { useState } from "react";

import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Sheet } from "@/features/core/components/panels/Sheet";

import { DoorOpen, LogOut } from "@tamagui/lucide-icons";

import { Button, Paragraph, Separator, Theme, XStack, YStack } from "tamagui";

export default function SignOutButton() {
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const { mutate, isPending } = useSignOut();

  const handleSignOut = () => {
    mutate();
    setShowConfirmSheet(false);
  };

  return (
    <>
      <ButtonCTA
        aria-label="Sign Out"
        onPress={() => setShowConfirmSheet(true)}
        disabled={showConfirmSheet}
        flex={1}
      >
        Sign Out
      </ButtonCTA>

      <Sheet open={showConfirmSheet} onOpenChange={setShowConfirmSheet}>
        <YStack gap="$4" width="100%">
          <YStack gap="$4" alignItems="center">
            <DoorOpen size={48} color="$color" />
            <Paragraph size="$8" fontWeight={700} textAlign="center">
              Confirm Sign Out
            </Paragraph>
            <Paragraph size="$6" textAlign="center">
              Are you sure you want to sign out?
            </Paragraph>
            <Separator flex={1} width="100%" />

            <XStack flex={1} width="100%" gap="$4">
              <ButtonCTA
                theme={"surface1"}
                aria-label="Close"
                disabled={isPending}
                onPress={() => setShowConfirmSheet(false)}
                flex={1}
              >
                Cancel
              </ButtonCTA>
              <Theme name="danger">
                <ButtonCTA
                  aria-label="Confirm Sign Out"
                  isLoading={isPending}
                  disabled={isPending}
                  onPress={handleSignOut}
                  flex={1}
                >
                  Sign Out
                </ButtonCTA>
              </Theme>
            </XStack>
          </YStack>
        </YStack>
      </Sheet>
    </>
  );
}
