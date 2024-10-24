import React from "react";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Sheet } from "@/features/core/components/panels/Sheet";

import { Paragraph, Separator, Theme, XStack, YStack } from "tamagui";

interface MenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending?: boolean;
  confirmFunction: () => void;
}
export function MenuSheet({
  isPending,
  open,
  onOpenChange,
  confirmFunction,
}: MenuSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <YStack gap="$4" width="100%">
        <YStack gap="$4" alignItems="center">
          <Paragraph size="$8" fontWeight={700} textAlign="center">
            Delete Submission
          </Paragraph>
          <Paragraph size="$6" textAlign="center">
            Are you sure you want to delete this submission?
          </Paragraph>
          <Separator flex={1} width="100%" />

          <XStack flex={1} width="100%" gap="$4">
            <ButtonCTA
              theme={"surface1"}
              aria-label="Close"
              disabled={isPending}
              onPress={() => onOpenChange(false)}
              flex={1}
            >
              Cancel
            </ButtonCTA>
            <Theme name="danger">
              <ButtonCTA
                aria-label="Confirm Sign Out"
                isLoading={isPending}
                disabled={isPending}
                onPress={confirmFunction}
                flex={1}
              >
                Delete
              </ButtonCTA>
            </Theme>
          </XStack>
        </YStack>
      </YStack>
    </Sheet>
  );
}
