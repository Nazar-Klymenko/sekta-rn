// src/components/Dialog.tsx
import React from "react";

import {
  Adapt,
  Sheet,
  Dialog as TamaguiDialog,
  DialogProps as TamaguiDialogProps,
  YStack,
  styled,
} from "tamagui";

interface DialogProps extends TamaguiDialogProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const StyledDialogContent = styled(TamaguiDialog.Content, {
  backgroundColor: "$background",
  borderRadius: "$6",
  padding: "$4",
  maxWidth: 500,
  width: "90%",
  borderColor: "$borderColorPress",
  borderWidth: 1,
});

export function Dialog({
  title,
  children,
  id,
  description,
  ...props
}: DialogProps) {
  return (
    <TamaguiDialog modal {...props}>
      <Adapt when="sm" platform="touch">
        <Sheet
          animation="quickest"
          zIndex={200001}
          modal
          dismissOnSnapToBottom
          dismissOnOverlayPress
        >
          <Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <TamaguiDialog.Portal>
        <TamaguiDialog.Overlay />
        <StyledDialogContent key={id}>
          <TamaguiDialog.Title>{title}</TamaguiDialog.Title>
          <TamaguiDialog.Description>{description}</TamaguiDialog.Description>
          <YStack gap="$4">{children}</YStack>
        </StyledDialogContent>
      </TamaguiDialog.Portal>
    </TamaguiDialog>
  );
}
