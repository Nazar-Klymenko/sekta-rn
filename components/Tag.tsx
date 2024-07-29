// src/components/Tag.tsx
import { Text, XStack, useTheme } from "tamagui";

interface TagProps {
  tag: string;
  onPress?: () => void;
  selected?: boolean;
}

export const Tag = ({ tag, onPress, selected }: TagProps) => {
  const theme = useTheme();

  return (
    <XStack
      borderRadius="$6"
      borderWidth={2}
      borderColor={selected ? "$accentBackground" : theme.orange9Light.get()}
      paddingVertical="$2"
      paddingHorizontal="$4"
      backgroundColor={selected ? "$accentBackground" : "transparent"}
      onPress={onPress}
    >
      <Text color="$color" fontSize="$3">
        {tag}
      </Text>
    </XStack>
  );
};
