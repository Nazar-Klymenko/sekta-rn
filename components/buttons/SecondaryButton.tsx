import { GestureResponderEvent } from "react-native";

import { Button, Text } from "tamagui";

type SecondaryButtonTypes = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
};

export const SecondaryButton = ({
  onPress,
  text,
}: SecondaryButtonTypes): JSX.Element => {
  return (
    <Button
      size="$7"
      height={50}
      //   backgroundColor="$black6"
      borderColor="$borderColor"
      animation="quick"
      onPress={onPress}
    >
      <Text fontSize={20} fontWeight="bold">
        {text}
      </Text>
    </Button>
  );
};
