import { GestureResponderEvent } from "react-native";

import {
  Button,
  ButtonProps,
  ButtonText,
  Spinner,
  Text,
  styled,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

interface PrimaryButtonTypes extends ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  text?: string;
  htmlFor?: string;
  isLoading?: boolean;
}

const StyledButton = styled(Button, {
  backgroundColor: "transparent",
  borderRadius: "$4",
  overflow: "hidden",
  minHeight: 54,
});

export const PrimaryButton = ({
  onPress,
  text,
  isLoading,
  htmlFor,
  children,
  ...props
}: PrimaryButtonTypes): JSX.Element => {
  return (
    <StyledButton
      onPress={onPress}
      htmlFor={htmlFor}
      iconAfter={isLoading ? <Spinner /> : undefined}
      disabledStyle={{ opacity: 0.5, pointerEvents: "none" }}
      pressStyle={{ opacity: 0.8 }}
      {...props}
    >
      <LinearGradient
        colors={["$pink9Light", "$accentBackground"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <ButtonText
        color="$colorContrast"
        fontWeight="bold"
        zIndex={1}
        fontSize={16}
      >
        {text} {children}
      </ButtonText>
    </StyledButton>
  );
};
