import React, { useState } from "react";

import { CheckCircle, Copy } from "@tamagui/lucide-icons";

import { Button, Paragraph, XStack, YStack } from "tamagui";

import * as Clipboard from "expo-clipboard";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

export const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value || value === "-") return;

    try {
      await Clipboard.setStringAsync(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <XStack gap="$4" alignItems="center" paddingVertical="$2">
      {icon}
      <YStack flex={1}>
        <Paragraph size="$2" color="$color9">
          {label}
        </Paragraph>
        <Paragraph size="$3" color="$color12">
          {value || "-"}
        </Paragraph>
      </YStack>
      {value && value !== "-" && (
        <Button
          icon={copied ? CheckCircle : Copy}
          size="$2"
          chromeless
          circular
          onPress={handleCopy}
          pressStyle={{ opacity: 0.7 }}
          opacity={copied ? 1 : 0.5}
          hoverStyle={{ opacity: 0.8 }}
          style={{ alignItems: "center", justifyContent: "center" }}
        />
      )}
    </XStack>
  );
};
