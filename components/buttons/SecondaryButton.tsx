import { GestureResponderEvent } from "react-native";

import { Button, Spinner, Text } from "tamagui";

type SecondaryButtonTypes = {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
  htmlFor?: string;
  isLoading?: boolean;
};

export const SecondaryButton = ({
  onPress,
  text,
  isLoading,
  htmlFor,
  ...props
}: SecondaryButtonTypes): JSX.Element => {
  return (
    <Button
      size="$7"
      height={50}
      borderColor="$borderColor"
      animation="quick"
      onPress={onPress}
      htmlFor={htmlFor}
      icon={isLoading ? <Spinner /> : undefined}
      disabledStyle={{ opacity: 0.5, pointerEvents: "none" }}
      {...props}
    >
      <Text fontSize={20} fontWeight="bold">
        {text}
      </Text>
    </Button>
  );
};
