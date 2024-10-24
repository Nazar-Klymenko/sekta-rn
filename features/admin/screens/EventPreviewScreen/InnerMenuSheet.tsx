import React from "react";

import { Sheet } from "@/features/core/components/panels/Sheet";

import {
  Button,
  Paragraph,
  Separator,
  Stack as TStack,
  Theme,
  XStack,
  YStack,
} from "tamagui";

export function InnerMenuSheet({
  open,
  onOpenChange,
  closeOuterSheet,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeOuterSheet: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <YStack gap="$4" width="100%">
        <YStack gap="$4">
          <Paragraph size="$8" fontWeight={700}>
            Delete Event
          </Paragraph>
          <Paragraph>
            By pressing delete, the event will be deleted permanently.
          </Paragraph>
          <Separator />

          <Theme name={"surface1"}>
            <XStack flex={1} width="100%" gap="$4">
              <Button
                size={"$6"}
                onPress={() => onOpenChange(false)}
                flex={1}
                backgroundColor={"$background"}
                animation="quickest"
                pressStyle={{
                  borderWidth: 0,
                  backgroundColor: "$background",
                  opacity: 0.7,
                }}
              >
                Cancel
              </Button>
              <Button
                size={"$6"}
                onPress={() => {
                  onOpenChange(false);
                  closeOuterSheet();
                }}
                flex={1}
                backgroundColor={"$red10Light"}
                animation="lazy"
                pressStyle={{
                  borderWidth: 0,
                  backgroundColor: "$background",
                  opacity: 0.7,
                }}
              >
                Delete
              </Button>
            </XStack>
          </Theme>
        </YStack>
      </YStack>
    </Sheet>
  );
}
