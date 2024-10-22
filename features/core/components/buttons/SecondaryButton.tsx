import { Button, ButtonProps, SizableText, Spinner } from "tamagui";

interface SecondaryButtonTypes extends ButtonProps {
  onPress?: () => void;
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
      onPress={onPress}
      htmlFor={htmlFor}
      borderRadius="$9"
      icon={isLoading ? <Spinner /> : undefined}
      disabledStyle={{ opacity: 0.5, pointerEvents: "none" }}
      {...props}
    >
      <SizableText fontWeight="600" fontSize="$7">
        {text}
      </SizableText>
    </Button>
  );
};
