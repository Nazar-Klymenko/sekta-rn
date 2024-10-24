import React from "react";

import { Stack, View, YStack, styled } from "tamagui";

export const StickyBottom = styled(View, {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "$background",
  padding: "$4",
  borderTopWidth: 1,
  borderTopColor: "$borderColor",
});
