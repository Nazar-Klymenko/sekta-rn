import React from "react";

import { ScrollView } from "tamagui";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView backgroundColor="$background" paddingHorizontal={16}>
      {children}
    </ScrollView>
  );
}
