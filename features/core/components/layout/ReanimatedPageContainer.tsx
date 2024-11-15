import React from "react";

import { Stack, YStack, styled } from "tamagui";

import Animated, { AnimatedScrollViewProps } from "react-native-reanimated";

interface ReanimatedPageContainerProps extends AnimatedScrollViewProps {
  children: React.ReactNode;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
  contentContainerStyle?: object;
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
        <ContentContainer fullWidth={fullWidth}>{children}</ContentContainer>
      </Animated.ScrollView>
    </Container>
  );
};
