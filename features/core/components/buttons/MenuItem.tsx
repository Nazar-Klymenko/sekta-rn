import { SizableText, Stack, XStack, styled } from "tamagui";

export const MenuItem = ({
  title,
  onPress,
  icon: Icon,
  fontSize = "$4",
}: {
  title: string;
  onPress: () => void;
  icon: React.ElementType;
  fontSize?: "$4" | "$6";
}) => (
  <ResponsiveStack onPress={onPress}>
    <XStack flex={1} alignItems="center" justifyContent="flex-start" gap="$3">
      <Icon size="$1" color="$gray10Light" />
      <SizableText fontSize={fontSize}>{title}</SizableText>
    </XStack>
  </ResponsiveStack>
);
const ResponsiveStack = styled(Stack, {
  hoverStyle: {
    backgroundColor: "$backgroundHover",
  },
  pressStyle: {
    backgroundColor: "$backgroundHover",
  },
  padding: "$4",
  minHeight: "$6",
  borderRadius: "$6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: "transparent",
  borderWidth: 0,
  marginBottom: 8,
});
