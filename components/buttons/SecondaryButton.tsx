import { GestureResponderEvent } from "react-native";

import { Button, ButtonProps, Spinner, Text } from "tamagui";

interface SecondaryButtonTypes extends ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
  htmlFor?: string;
  isLoading?: boolean;
}

export const SecondaryButton = ({
  onPress,
  text,
  isLoading,
  htmlFor,
  ...props
}: SecondaryButtonTypes): JSX.Element => {
  return (
    <Button
      animation="quick"
      onPress={onPress}
      htmlFor={htmlFor}
      icon={isLoading ? <Spinner /> : undefined}
      disabledStyle={{ opacity: 0.5, pointerEvents: "none" }}
      {...props}
    >
      {text}
    </Button>
  );
};
