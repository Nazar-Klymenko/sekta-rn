import { GestureResponderEvent } from "react-native";

import { Button, ButtonProps, Spinner, Text, Theme } from "tamagui";

interface PrimaryButtonTypes extends ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
  htmlFor?: string;
  isLoading?: boolean;
}

export const PrimaryButton = ({
  onPress,
  text,
  isLoading,
  htmlFor,
  ...props
}: PrimaryButtonTypes): JSX.Element => {
  return (
    <Button
      borderRadius="$2"
      backgroundColor="$accentBackground"
      color="$accentColor"
      hoverStyle={{ backgroundColor: "$accentBackground", opacity: 0.9 }}
      pressStyle={{ backgroundColor: "$accentBackground", opacity: 0.9 }}
      size="$7"
      height={40}
      animation="quick"
      onPress={onPress}
      htmlFor={htmlFor}
      icon={isLoading ? <Spinner /> : undefined}
      disabledStyle={{ opacity: 0.5, pointerEvents: "none" }}
      {...props}
    >
      <Text fontSize={16} fontWeight="bold">
        {text}
      </Text>
    </Button>
  );
};
