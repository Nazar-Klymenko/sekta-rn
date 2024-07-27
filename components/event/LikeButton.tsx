import { Heart } from "@tamagui/lucide-icons";

import { GestureResponderEvent } from "react-native";

import { Button, useTheme } from "tamagui";

interface LikeButtonProps {
  isLiked: boolean;
  handleLike: (
    e: React.TouchEvent | React.MouseEvent | GestureResponderEvent
  ) => void;
}
export const LikeButton = ({ isLiked, handleLike }: LikeButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      size="$3"
      circular
      icon={
        <Heart
          size={20}
          color={isLiked ? theme.red10Light.get() : theme.gray10Light.get()}
          fill={isLiked ? theme.red10Light.get() : "transparent"}
        />
      }
      onPress={(e) => handleLike(e)}
      backgroundColor={isLiked ? "$red2Light" : "rgba(0, 0, 0, 0.6)"}
    />
  );
};
