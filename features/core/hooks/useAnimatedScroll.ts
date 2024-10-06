import { useSharedValue } from "react-native-reanimated";
import { useAnimatedScrollHandler } from "react-native-reanimated";

export const useAnimatedScroll = (scrollEventThrottle = 16) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return { scrollHandler, scrollEventThrottle, scrollY };
};
