import React from "react";

import { Pressable } from "react-native";

import { ChevronRight } from "@tamagui/lucide-icons";

import { H2, Paragraph, StackProps, XStack } from "tamagui";

type LucideIcon = typeof ChevronRight;

type HeaderProps = StackProps & {
  title: string;
  actionText?: string;
  onActionPress: () => void;
  Icon?: LucideIcon;
};

const SectionHeaderWithAction = ({
  title,
  actionText = "View all",
  onActionPress,
  Icon = ChevronRight,
  ...props
}: HeaderProps) => {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="baseline"
      marginBottom="$2"
      {...props}
    >
      <H2>{title}</H2>
      <Pressable
        onPress={onActionPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <XStack
          alignItems="center"
          gap="$2"
          pressStyle={{ opacity: 0.7 }}
          animation="quickest"
        >
          <Paragraph>{actionText}</Paragraph>
          <Icon size={20} />
        </XStack>
      </Pressable>
    </XStack>
  );
};

export default SectionHeaderWithAction;
