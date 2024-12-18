import React from "react";


import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";

import { Ticket } from "@tamagui/lucide-icons";

export const StickyBottomButton = () => {
  return (
    <ButtonCTA theme="accent" onPress={() => {}}>
      <Ticket /> I'm Going!
    </ButtonCTA>
  );
};
