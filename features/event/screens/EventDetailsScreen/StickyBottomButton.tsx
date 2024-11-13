import React from "react";

import { Timestamp } from "firebase/firestore";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { useCountdown } from "@/features/core/hooks/useCountdown";

import { Ticket } from "@tamagui/lucide-icons";

type StickyButtonBottomProps = {
  onPress?: () => void;
  targetDate: Timestamp;
};
export const StickyBottomButton = ({
  onPress,
  targetDate,
}: StickyButtonBottomProps) => {
  const { timeLeft, timeSinceEvent, hasEventPassed, hasEventStarted } =
    useCountdown(targetDate);

  if (hasEventPassed()) {
    return null;
  }
  if (hasEventStarted()) {
    return (
      <ButtonCTA theme="accent" onPress={() => {}}>
        <Ticket /> I'm Going!
      </ButtonCTA>
    );
  } else {
    return (
      <ButtonCTA theme="accent" onPress={() => {}}>
        <Ticket /> I'm Going!
      </ButtonCTA>
    );
  }
};
