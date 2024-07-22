import { Text, XStack, useTheme } from "tamagui";

export const Tag = ({ tag }: { tag: string }) => {
  const theme = useTheme();

  return (
    <XStack
      borderRadius="$6"
      borderWidth={2}
      borderColor={theme.orange9Light.get()}
      paddingVertical="$2"
      paddingHorizontal="$4"
    >
      <Text color="white" fontSize="$3">
        {tag}
      </Text>
    </XStack>
  );
};
