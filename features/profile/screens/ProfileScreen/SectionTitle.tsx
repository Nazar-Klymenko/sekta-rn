import React from "react";

import { Paragraph } from "tamagui";

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Paragraph size="$7" fontWeight={700}>
    {children}
  </Paragraph>
);
