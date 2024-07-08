import { GestureResponderEvent } from "react-native";

import { Button, ButtonProps, Text, Theme } from "tamagui";

interface PrimaryButtonTypes extends ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
  htmlFor?: string;
}

export const PrimaryButton = ({
  onPress,
  text,
  htmlFor,
  ...props
}: PrimaryButtonTypes): JSX.Element => {
  return (
    <Theme name="light_active">
      <Button
        size="$7"
        height={50}
        animation="quick"
        onPress={onPress}
        htmlFor={htmlFor}
        {...props}
      >
        <Text fontSize={20} fontWeight="bold">
          {text}
        </Text>
      </Button>
    </Theme>
  );
};
