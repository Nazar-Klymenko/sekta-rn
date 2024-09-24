// src/components/Tag.tsx
import { SizableText, XStack, useTheme } from "tamagui";

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
      borderColor={selected ? "$accentBackground" : theme.orange9Light.get()}
      paddingVertical="$2"
      paddingHorizontal="$4"
      backgroundColor={selected ? "$accentBackground" : "transparent"}
      onPress={onPress}
      alignItems="center"
      gap="$2"
      cursor={selected ? "pointer" : "unset"}
    >
      <SizableText color="$color" fontSize="$3">
        {tag}
      </SizableText>
      {icon}
    </XStack>
  );
};
