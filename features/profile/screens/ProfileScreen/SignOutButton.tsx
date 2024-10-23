import React, { useState } from "react";

import { useSignOut } from "@/features/auth/hooks/useSignOut";

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
  const [open, setOpen] = useState(false);
  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
    setOpen(false); // Close the sheet after signing out
  };

  return (
    <>
      <Button size={"$6"} onPress={() => setOpen(true)}>
        Sign Out
      </Button>

      <Sheet
        open={open}
        onOpenChange={setOpen}
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
          <Theme name={"surface1"}>
            <YStack gap="$4" width="100%">
              <YStack gap="$4" alignItems="center">
                <DoorOpen size={48} color="$color" />
                <Paragraph size="$8" fontWeight={700} textAlign="center">
                  Confirm Sign Out
                </Paragraph>
                <Paragraph size="$6" textAlign="center">
                  Are you sure you want to sign out?
                </Paragraph>
                <Separator />
                <XStack flex={1} width="100%" gap="$4">
                  <Button
                    size={"$6"}
                    onPress={() => setOpen(false)}
                    flex={1}
                    backgroundColor={"$background"}
                    animation="quickest"
                    borderRadius="$2"
                  >
                    Cancel
                  </Button>
                  <Button
                    size={"$6"}
                    onPress={handleSignOut}
                    flex={1}
                    backgroundColor={"$red10Dark"}
                    pressStyle={{ backgroundColor: "$red9Dark" }}
                    animation="quickest"
                    borderRadius="$2"
                  >
                    Sign Out
                  </Button>
                </XStack>
              </YStack>
            </YStack>
          </Theme>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
