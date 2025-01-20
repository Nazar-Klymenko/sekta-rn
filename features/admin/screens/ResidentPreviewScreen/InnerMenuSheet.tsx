import React from "react";

import {
  Button,
  Paragraph,
  Separator,
  Stack as TStack,
  Theme,
  XStack,
  YStack,
} from "tamagui";

import { Frown, Laugh, TicketX } from "@tamagui/lucide-icons";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Sheet } from "@/features/core/components/panels/Sheet";

export function InnerMenuSheet({
  open,
  onOpenChange,
  confirmFunction,
  isPending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmFunction: () => void;
  isPending: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} insideModal>
      <YStack gap="$4" width="100%">
        <YStack gap="$4" alignItems="center">
          <Frown size={48} color="$color" />
          <Paragraph size="$8" fontWeight={700}>
            Delete Resident
          </Paragraph>
          <Paragraph>
            By pressing delete, the resident will be deleted permanently.
          </Paragraph>
          <Separator />

          <Theme name={"surface1"}>
            <XStack flex={1} width="100%" gap="$4">
              <ButtonCTA
                theme={"surface1"}
                disabled={isPending}
                onPress={() => onOpenChange(false)}
                flex={1}
              >
                Cancel
              </ButtonCTA>
              <Theme name="danger">
                <ButtonCTA
                  isLoading={isPending}
                  disabled={isPending}
                  onPress={() => {
                    confirmFunction();
                  }}
                  flex={1}
                >
                  Delete
                </ButtonCTA>
              </Theme>
            </XStack>
          </Theme>
        </YStack>
      </YStack>
    </Sheet>
  );
}
