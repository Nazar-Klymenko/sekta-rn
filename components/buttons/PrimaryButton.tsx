import { GestureResponderEvent } from "react-native";
import { Button, ButtonProps, Spinner, Text, Theme, styled } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

interface PrimaryButtonTypes extends ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
  htmlFor?: string;
  isLoading?: boolean;
}

const StyledButton = styled(Button, {
  backgroundColor: "transparent",
  borderRadius: "$4",
  overflow: "hidden",
  minHeight: 54,

  variants: {
    gradient: {
      true: {
        backgroundImage: "none",
      },
    },
  } as const,
});

const ButtonGradient = styled(LinearGradient, {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

export const PrimaryButton = ({
  onPress,
  text,
  isLoading,
  htmlFor,
  ...props
}: PrimaryButtonTypes): JSX.Element => {
  return (
    <StyledButton
      onPress={onPress}
      htmlFor={htmlFor}
      icon={isLoading ? <Spinner /> : undefined}
      disabledStyle={{ opacity: 0.5, pointerEvents: "none" }}
      pressStyle={{ opacity: 0.8 }}
      gradient
      {...props}
    >
      <ButtonGradient
        colors={["$pink8Light", "$accentBackground"]}
        start={[0, 0] as any}
        end={[1, 1] as any}
      />
      <Text color="$colorContrast" fontWeight="bold" zIndex={1}>
        {text}
      </Text>
    </StyledButton>
  );
};
