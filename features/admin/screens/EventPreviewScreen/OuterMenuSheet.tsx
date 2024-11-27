import React from "react";

import { Sheet } from "@/features/core/components/panels/Sheet";
import { DisplayEvent } from "@/features/event/models/Event";

import { Edit3, X } from "@tamagui/lucide-icons";

import { Button, Separator, Stack as TStack, Theme } from "tamagui";

import { useRouter } from "expo-router";

export function OuterMenuSheet({
  open,
  onOpenChange,
  setInnerShowConfirmSheet,
  id,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setInnerShowConfirmSheet: (open: boolean) => void;
  id: DisplayEvent["id"];
}) {
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <Theme name={"surface1"}>
        <TStack flex={1} width="100%">
          <Button
            size={"$6"}
            onPress={() => {
              onOpenChange(false);
              router.push({
                pathname: "/admin/events/[id]/update",
                params: { id: id },
              });
            }}
            flex={1}
            width="100%"
            backgroundColor={"$"}
            icon={Edit3}
            borderBottomRightRadius={0}
            borderBottomLeftRadius={0}
            animation="quickest"
            pressStyle={{
              borderWidth: 0,
              backgroundColor: "$background",
              opacity: 0.7,
            }}
          >
            Edit
          </Button>
          <Separator />
          <Button
            size={"$6"}
            onPress={() => {
              setInnerShowConfirmSheet(true);
            }}
            borderTopRightRadius={0}
            borderTopLeftRadius={0}
            width="100%"
            icon={X}
            color={"$red10Dark"}
            animation="lazy"
            pressStyle={{
              borderWidth: 0,
              backgroundColor: "$background",
              opacity: 0.7,
            }}
          >
            Delete
          </Button>
        </TStack>
      </Theme>
    </Sheet>
  );
}
