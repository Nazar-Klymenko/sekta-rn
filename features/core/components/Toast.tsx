import { AlertTriangle, CheckCircle, Info, X } from "@tamagui/lucide-icons";
import { Toast, useToastState } from "@tamagui/toast";

import React from "react";

import { Button, XStack, YStack, styled } from "tamagui";

const StyledToast = styled(Toast, {
  width: "90%",
  maxWidth: 400,
  backgroundColor: "$backgroundHover",
  padding: "$1",
  borderColor: "$borderColor",
  borderWidth: 1,
  alignItems: "center",
  borderRadius: "$6",
  margin: "$4",
  variants: {
    variant: {
      error: {
        borderLeftColor: "$red10Light",
        borderLeftWidth: 4,
      },
      success: {
        borderLeftColor: "$green10Light",
        borderLeftWidth: 4,
      },
      info: {
        borderLeftColor: "$blue10Light",
        borderLeftWidth: 4,
      },
    },
  } as const,
});

const CloseButton = styled(Button, {
  backgroundColor: "transparent",
  marginLeft: "auto",
});

const IconWrapper = styled(YStack, {
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "$2",
});
const ContentWrapper = styled(YStack, {
  flex: 1,
  marginHorizontal: "$2",
  marginVertical: "$1",
});
export const CurrentToast = () => {
  const toast = useToastState();

  if (!toast || toast.isHandledNatively) {
    return null;
  }

  const getIcon = () => {
    switch (toast.variant) {
      case "error":
        return <AlertTriangle color="$red10Light" size="$1.5" />;
      case "success":
        return <CheckCircle color="$green10Light" size="$1.5" />;
      default:
        return <Info color="$blue10Light" size="$1.5" />;
    }
  };

  return (
    <StyledToast
      key={toast.id}
      duration={5000}
      animation="quickest"
      enterStyle={{ opacity: 0, scale: 0.9, y: -10 }}
      exitStyle={{ opacity: 0, scale: 0.95, y: 10 }}
      opacity={1}
      scale={1}
      y={0}
      variant={toast.variant as "error" | "success" | "info"}
      unstyled
    >
      <XStack flex={1} alignItems="center">
        <IconWrapper>{getIcon()}</IconWrapper>
        <ContentWrapper>
          <Toast.Title fontWeight="bold" numberOfLines={1}>
            {toast.title}
          </Toast.Title>
          <Toast.Description numberOfLines={2}>
            {toast.message}
          </Toast.Description>
        </ContentWrapper>
        <Toast.Close asChild>
          <CloseButton circular icon={<X size="$1" />} />
        </Toast.Close>
      </XStack>
    </StyledToast>
  );
};
