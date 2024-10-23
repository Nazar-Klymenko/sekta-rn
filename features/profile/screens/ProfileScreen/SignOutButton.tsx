import React, { useState } from "react";

import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";

import { DoorOpen, LogOut } from "@tamagui/lucide-icons";

import {
  Button,
  Paragraph,
  Separator,
  Sheet,
  Theme,
  XStack,
  YStack,
} from "tamagui";

export default function SignOutButton() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { mutate, isPending } = useSignOut();

  const handleSignOut = () => {
    mutate();
    setShowConfirmDialog(false);
  };

  return (
    <>
      <ButtonCTA
        aria-label="Sign Out"
        onPress={() => setShowConfirmDialog(true)}
        disabled={showConfirmDialog}
        flex={1}
      >
        Sign Out
      </ButtonCTA>

      <Sheet
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        dismissOnSnapToBottom
        animation="medium"
        modal
        snapPointsMode="fit"
      >
        <Sheet.Overlay
          key="signoutOverlay"
          animation="quickest"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame
          padding="$4"
          justifyContent="center"
          alignItems="center"
          gap="$5"
        >
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
                  onPress={() => setShowConfirmDialog(false)}
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
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
