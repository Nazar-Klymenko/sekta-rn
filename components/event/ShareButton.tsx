import { Heart, Share } from "@tamagui/lucide-icons";

import { GestureResponderEvent } from "react-native";

import { Button, useTheme } from "tamagui";

interface ShareButtonProps {
  size: "sm" | "lg";
  handleShare?: (
    e: React.TouchEvent | React.MouseEvent | GestureResponderEvent
  ) => void;
}
export const ShareButton = ({ size, handleShare }: ShareButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      size={size === "sm" ? "$3" : "$5"}
      circular
      icon={<Share size={size === "sm" ? 20 : 24} />}
      //   onPress={(e) => handleShare(e)}
      backgroundColor={"$colorTransparent"}
    />
  );
};
// color={isLiked ? theme.red10Light.get() : theme.gray10Light.get()}
// fill={isLiked ? theme.red10Light.get() : "transparent"}
