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
      <TamaguiDialog.Portal>
        <TamaguiDialog.Overlay
          key={"overlay" + id}
          animation="quickest"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <StyledDialogContent key={id}>
          <TamaguiDialog.Title>{title}</TamaguiDialog.Title>
          <TamaguiDialog.Description>{description}</TamaguiDialog.Description>
          <YStack gap="$4">{children}</YStack>
        </StyledDialogContent>
      </TamaguiDialog.Portal>
    </TamaguiDialog>
  );
}
