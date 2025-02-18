import React from "react";

import { GestureResponderEvent, Platform } from "react-native";

import {
  Bookmark,
  Heart,
  RefreshCcw,
  Share,
  SlidersHorizontal,
} from "@tamagui/lucide-icons";

import {
  Button,
  ButtonProps,
  Paragraph,
  Spinner,
  YStack,
  useTheme,
} from "tamagui";

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
      backgroundColor={"$background075"}
      borderWidth={0}
    />
  );
};
interface RetryButtonProps extends ButtonProps {
  size?: "sm" | "lg";
  onPress?: () => void;
  isLoading: boolean;
}

export const RetryButton = ({
  size = "sm",
  onPress,
  isLoading,
  ...props
}: RetryButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      size={"$5"}
      circular
      icon={isLoading ? <Spinner size="small" /> : <RefreshCcw size={24} />}
      onPress={onPress}
      backgroundColor={"$colorTransparent"}
      borderWidth={0}
      {...props}
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
      borderWidth={0}
      icon={
        <Bookmark
          size={size === "sm" ? 20 : 24}
          color={isLiked ? theme.red10Light.get() : "$color"}
          fill={isLiked ? theme.red10Light.get() : "transparent"}
        />
      }
      onPress={(e) => handleLike(e)}
      backgroundColor={"$background075"}
    />
  );
};
interface FilterButtonProps {
  appliedFiltersCount: number;
  setOpen: (arg: boolean) => void;
}
export const FilterButton = ({
  appliedFiltersCount,
  setOpen,
}: FilterButtonProps) => (
  <YStack
    position="relative"
    justifyContent="center"
    alignItems="center"
    marginHorizontal={Platform.OS === "web" ? "$4" : "unset"}
  >
    <Button
      size="$3"
      icon={SlidersHorizontal}
      circular
      onPress={() => setOpen(true)}
    />
    {appliedFiltersCount > 0 && (
      <YStack
        position="absolute"
        top={-5}
        right={-5}
        backgroundColor="$red10Dark"
        borderRadius={10}
        width={20}
        height={20}
        justifyContent="center"
        alignItems="center"
        zIndex={1}
      >
        <Paragraph color="white" fontSize={10}>
          {appliedFiltersCount}
        </Paragraph>
      </YStack>
    )}
  </YStack>
);
