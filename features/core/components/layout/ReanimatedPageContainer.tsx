import React from "react";

import { ScrollViewProps, Stack, View, YStack, styled } from "tamagui";

import Animated, { AnimatedScrollViewProps } from "react-native-reanimated";

import { StickyBottom } from "./StickyBottom";

interface ReanimatedPageContainerProps extends AnimatedScrollViewProps {
  children: React.ReactNode;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
  contentContainerStyle?: object;
  stickyBottom?: React.ReactNode;
  scrollable?: boolean;
  fullWidth?: boolean;
}

const Container = styled(YStack, {
  flex: 1,
  backgroundColor: "$background",
});

const ContentContainer = styled(Stack, {
  flexGrow: 1,
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

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
  ...props
}) => {
  return (
    <Container>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        contentContainerStyle={[contentContainerStyle]}
        {...props}
      >
        <ContentContainer
          paddingBottom={stickyBottom ? 100 : 0}
          fullWidth={fullWidth}
        >
          {children}
        </ContentContainer>
      </Animated.ScrollView>
      {stickyBottom && <StickyBottom>{stickyBottom}</StickyBottom>}
    </Container>
  );
};
