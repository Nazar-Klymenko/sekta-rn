// SkeletonResidentAvatar.tsx
import React from "react";

import { Stack, styled } from "tamagui";

import Skeleton from "@/features/core/components/Skeleton";

export const SkeletonResidentAvatar = () => {
  return (
    <CardContainer>
      <Skeleton
        width={48} // $12 size equivalent
        height={48}
        borderRadius="$2"
      />
      <Skeleton
        position="absolute"
        bottom={0}
        height={24}
        width="100%"
        borderRadius="$1"
      />
    </CardContainer>
  );
};

const CardContainer = styled(Stack, {
  position: "relative",
  borderRadius: "$2",
  overflow: "hidden",
  marginVertical: 10,
});
