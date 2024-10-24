import React from "react";

import { Stack, View, YStack, styled } from "tamagui";

import Animated from "react-native-reanimated";

import { StickyBottom } from "./StickyBottom";

interface ReanimatedPageContainerProps {
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
}) => {
  const Wrapper = scrollable ? Animated.ScrollView : View;

  return (
    <Container>
      <Wrapper
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        contentContainerStyle={[contentContainerStyle]}
      >
        <ContentContainer
          paddingBottom={stickyBottom ? 100 : 0}
          fullWidth={fullWidth}
        >
          {children}
        </ContentContainer>
      </Wrapper>
      {stickyBottom && <StickyBottom>{stickyBottom}</StickyBottom>}
    </Container>
  );
};
