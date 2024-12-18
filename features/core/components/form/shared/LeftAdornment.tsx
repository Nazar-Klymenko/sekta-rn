import React from "react";

import { SizableText } from "tamagui";

export const LeftAdornment = ({ children }: { children: React.ReactNode }) => {
  return (
    <SizableText
      style={{
        position: "absolute",
        left: 16,
        color: "grey",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 1,
      }}
    >
      {children}
    </SizableText>
  );
};
