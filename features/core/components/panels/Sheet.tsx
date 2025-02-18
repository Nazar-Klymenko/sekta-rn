import React from "react";

import { Sheet as ReusableSheet, YStack } from "tamagui";

interface ReusableSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insideModal?: boolean;
  children: React.ReactNode;
}

export const Sheet = ({
  open,
  onOpenChange,
  insideModal = false,
  children,
}: ReusableSheetProps) => (
  <ReusableSheet
    open={open}
    onOpenChange={onOpenChange}
    dismissOnSnapToBottom
    dismissOnOverlayPress
    animation="quicker"
    snapPointsMode="fit"
    modal={!insideModal}
  >
    <ReusableSheet.Overlay
      animation="medium"
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    />
    <ReusableSheet.Handle theme={"surface2"} />
    <ReusableSheet.Frame
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$5"
      theme={"surface1"}
    >
      <YStack gap="$4" width="100%" theme={"surface2"} paddingBottom="$4">
        {children}
      </YStack>
    </ReusableSheet.Frame>
  </ReusableSheet>
);
