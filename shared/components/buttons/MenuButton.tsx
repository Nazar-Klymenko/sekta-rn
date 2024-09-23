import { GestureResponderEvent } from "react-native";

import { Button, ButtonProps, Spinner, Text } from "tamagui";

interface MenuButtonTypes extends ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
  htmlFor?: string;
  isLoading?: boolean;
}

export const MenuButton = ({
  onPress,
  text,
  isLoading,
  htmlFor,
  ...props
}: MenuButtonTypes): JSX.Element => {
  return (
    <Button
      size="$3"
      borderColor="$borderColor"
      animation="quickest"
      onPress={onPress}
      htmlFor={htmlFor}
      icon={isLoading ? <Spinner /> : undefined}
      disabledStyle={{ opacity: 0.5, pointerEvents: "none" }}
      {...props}
    >
      <Text fontSize={12} fontWeight="normal">
        {text}
      </Text>
    </Button>
  );
};
