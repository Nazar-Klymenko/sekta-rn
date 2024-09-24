// src/components/Tag.tsx
import { Paragraph, XStack, useTheme } from "tamagui";

interface TagProps {
  tag: string;
  onPress?: () => void;
  selected?: boolean;
  icon?: React.ReactNode;
}

export const Tag = ({ tag, onPress, selected, icon }: TagProps) => {
  const theme = useTheme();

  return (
    <XStack
      borderRadius="$6"
      borderWidth={2}
      borderColor={selected ? "$accentBackground" : "$accentBackground"}
      paddingVertical="$2"
      paddingHorizontal="$4"
      backgroundColor={selected ? "$accentBackground" : "transparent"}
      onPress={onPress}
      alignItems="center"
      gap="$2"
      cursor={selected ? "pointer" : "unset"}
    >
      <Paragraph color="$color" fontSize="$3">
        {tag}
      </Paragraph>
      {icon}
    </XStack>
  );
};
