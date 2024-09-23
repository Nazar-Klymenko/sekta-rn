import React from "react";

import { StyleSheet, View } from "react-native";

import Animated from "react-native-reanimated";

interface ReanimatedPageContainerProps {
  children: React.ReactNode;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
  contentContainerStyle?: object;
  stickyBottom?: React.ReactNode;
  scrollable?: boolean;
  fullWidth?: boolean;
}

export const ReanimatedPageContainer: React.FC<
  ReanimatedPageContainerProps
> = ({
  children,
  onScroll,
  scrollEventThrottle = 16,
  contentContainerStyle,
  stickyBottom,
  scrollable = true,
  fullWidth = false,
}) => {
  const Wrapper = scrollable ? Animated.ScrollView : View;

  return (
    <View style={styles.container}>
      <Wrapper
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        contentContainerStyle={[
          styles.contentContainer,
          contentContainerStyle,
          fullWidth && styles.fullWidth,
        ]}
      >
        {children}
      </Wrapper>
      {stickyBottom && <View style={styles.stickyBottom}>{stickyBottom}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e11", // Default background color, adjust as needed
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Adjust to ensure space for sticky bottom if necessary
  },
  fullWidth: {
    width: "100%", // Ensure full width for content when fullWidth prop is true
  },
  stickyBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0e0e11", // Adjust the background color to match your theme
    padding: 16, // Add padding for the sticky bottom content
    borderTopWidth: 1,
    borderTopColor: "hsla(240, 9%, 17%, 1)",
  },
});
