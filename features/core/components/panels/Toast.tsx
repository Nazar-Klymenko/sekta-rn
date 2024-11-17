import React from "react";

import { AlertTriangle, CheckCircle, Info, X } from "@tamagui/lucide-icons";
import { Toast, useToastState } from "@tamagui/toast";

import { Button, Theme, XStack, YStack } from "tamagui";

const ICONS = {
  error: <AlertTriangle color="$red10Dark" size="$1" />,
  success: <CheckCircle color="$green10Dark" size="$1" />,
  info: <Info color="$blue10Dark" size="$1" />,
};

const COLORS = {
  error: "$red10Dark",
  success: "$green10Dark",
  info: "$blue10Dark",
};

export const CurrentToast = () => {
  const toast = useToastState();

  if (!toast || toast.isHandledNatively) {
    return null;
  }

  const variant = toast.variant as keyof typeof ICONS;

  return (
    <Theme name={"surface1"}>
      <Toast
        key={toast.id}
        duration={4000}
        enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
        exitStyle={{ opacity: 0, scale: 1, y: -20 }}
        opacity={1}
        scale={1}
        animation="quickest"
        backgroundColor={"$background"}
        padding="$3"
        borderRadius="$4"
        elevate
        style={{ maxWidth: 400, width: "90%" }}
      >
        <XStack alignItems="center" gap="$4" flexWrap="nowrap">
          {ICONS[variant]}

          <YStack flexGrow={1}>
            <Toast.Title
              color={COLORS[variant]}
              fontWeight="600"
              fontSize={"$6"}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Toast.Title>
            <Toast.Description color="$color" opacity={0.8} fontSize={"$4"}>
              {toast.message}
            </Toast.Description>
          </YStack>

          <Toast.Close asChild>
            <Button
              chromeless
              borderWidth={0}
              borderRadius="$12"
              icon={<X size="$1" color="$color" />}
              hoverStyle={{ backgroundColor: "$background" }}
            />
          </Toast.Close>
        </XStack>
      </Toast>
    </Theme>
  );
};
