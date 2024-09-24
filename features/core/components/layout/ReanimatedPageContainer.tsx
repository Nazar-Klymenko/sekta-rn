import React from "react";

import { Stack, View, YStack, styled } from "tamagui";

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

const Container = styled(YStack, {
  flex: 1,
  backgroundColor: "$background",
});

const ContentContainer = styled(Stack, {
  flexGrow: 1,
  paddingBottom: 100, // Adjust to ensure space for sticky bottom if necessary
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

const StickyBottom = styled(View, {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "$background",
  padding: "$4",
  borderTopWidth: 1,
  borderTopColor: "$borderColor",
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
        <ContentContainer fullWidth={fullWidth}>{children}</ContentContainer>
      </Wrapper>
      {stickyBottom && <StickyBottom>{stickyBottom}</StickyBottom>}
    </Container>
  );
};
