import { Heart } from "@tamagui/lucide-icons";

import { GestureResponderEvent } from "react-native";

import { Button, useTheme } from "tamagui";

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
          color={isLiked ? theme.red10Light.get() : theme.gray10Light.get()}
          fill={isLiked ? theme.red10Light.get() : "transparent"}
        />
      }
      onPress={(e) => handleLike(e)}
      backgroundColor={isLiked ? "$red2Light" : "rgba(0, 0, 0, 0.6)"}
    />
  );
};
