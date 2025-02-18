import React from "react";

import { Paragraph, XStack, styled } from "tamagui";

type MenuItemProps = {
  title: string;
  icon: React.ElementType;
  onPress: () => void;
};

export const MenuItem = ({ title, icon: Icon, onPress }: MenuItemProps) => (
  <ResponsiveStack onPress={onPress}>
    <Icon size="$1" />
    <Paragraph size="$6" fontWeight={500}>
      {title}
    </Paragraph>
  </ResponsiveStack>
);

const ResponsiveStack = styled(XStack, {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "$3",
  paddingVertical: "$3",
  animation: "quickest",
  pressStyle: {
    opacity: 0.7,
  },
});
