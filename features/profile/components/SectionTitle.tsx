import React from "react";

import { SizableText } from "tamagui";

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <SizableText fontSize="$5" fontWeight="bold" marginBottom="$2">
    {children}
  </SizableText>
);
