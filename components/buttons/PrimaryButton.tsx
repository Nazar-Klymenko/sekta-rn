import { GestureResponderEvent } from "react-native";
import { Button, ButtonProps, Spinner, Text, styled } from "tamagui";
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
      <LinearGradient
        colors={["$pink8Light", "$accentBackground"]}
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
      <Text color="$colorContrast" fontWeight="bold" zIndex={1}>
        {text}
      </Text>
    </StyledButton>
  );
};
