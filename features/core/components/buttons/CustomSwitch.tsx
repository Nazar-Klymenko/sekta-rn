import { AnimatePresence, Stack, XStack, styled, useTheme } from "tamagui";

const CustomSwitch = styled(XStack, {
  width: 52,
  height: 28,
  borderRadius: 14,
  padding: 2,
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "flex-start",
});

const CustomThumb = styled(Stack, {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "white",
});

const AnimatedThumb = ({ checked }: { checked: boolean }) => (
  <AnimatePresence>
    <CustomThumb
      animation="quickest"
      x={checked ? 24 : 0}
      opacity={1}
      scale={1}
      enterStyle={{ opacity: 0, scale: 0.5 }}
      exitStyle={{ opacity: 0, scale: 0.5 }}
    />
  </AnimatePresence>
);

const Switch = ({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) => {
  const theme = useTheme();

  return (
    <CustomSwitch
      onPress={onPress}
      animation="quickest"
      backgroundColor={
        checked ? theme.accentColor.get() : theme.gray5Light.get()
      }
    >
      <AnimatedThumb checked={checked} />
    </CustomSwitch>
  );
};

export { Switch };
