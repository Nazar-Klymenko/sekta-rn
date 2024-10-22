import { RefreshCcw } from "@tamagui/lucide-icons";

import { Button } from "tamagui";

interface RetryButtonProps {
  size?: "sm" | "lg";
  onPress?: () => void;
}

export const RetryButton = ({ size = "sm", onPress }: RetryButtonProps) => {
  return (
    <Button
      size={size === "sm" ? "$3" : "$5"}
      circular
      icon={<RefreshCcw size={size === "sm" ? 20 : 24} />}
      onPress={onPress}
      backgroundColor={"$colorTransparent"}
      borderWidth={0}
    />
  );
};
