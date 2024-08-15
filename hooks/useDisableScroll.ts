// hooks/useDisableScroll.ts
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";

export const useDisableScroll = (shouldDisable: boolean) => {
  const { width, height } = useWindowDimensions();
  const isVertical = height > width;

  useEffect(() => {
    if (typeof window !== "undefined" && isVertical) {
      if (shouldDisable) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      } else {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      };
    }
  }, [shouldDisable, isVertical]);
};
