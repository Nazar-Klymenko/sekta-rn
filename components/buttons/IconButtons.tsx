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
interface LikeButtonProps {
  isLiked: boolean;
  size: "sm" | "lg";
  handleLike: (
    e: React.TouchEvent | React.MouseEvent | GestureResponderEvent
  ) => void;
}
export const LikeButton = ({ isLiked, size, handleLike }: LikeButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      size={size === "sm" ? "$3" : "$5"}
      circular
      icon={
        <Heart
          size={size === "sm" ? 20 : 24}
          color={isLiked ? theme.red10Light.get() : "$color"}
          fill={isLiked ? theme.red10Light.get() : "transparent"}
        />
      }
      onPress={(e) => handleLike(e)}
      backgroundColor={"$colorTransparent"}
    />
  );
};
