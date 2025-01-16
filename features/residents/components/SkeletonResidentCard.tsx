// SkeletonResidentCard.tsx
import React from "react";

import { Stack, YStack, styled } from "tamagui";

import Skeleton from "@/features/core/components/Skeleton";

export const SkeletonResidentCard = () => {
  return (
    <CardContainer width={"100%"}>
      <ImageContainer>
        <Skeleton width="100%" aspectRatio={1} borderRadius="$2" />
      </ImageContainer>
      <ContentContainer>
        <Skeleton height={28} width="80%" />
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled(YStack, {
  borderRadius: "$2",
  overflow: "hidden",
  marginVertical: 10,
});

const ImageContainer = styled(Stack, {
  position: "relative",
});

const ContentContainer = styled(YStack, {
  paddingVertical: 24,
  paddingHorizontal: 4,
  gap: 8,
});
