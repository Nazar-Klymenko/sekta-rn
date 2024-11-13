import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { Timestamp } from "firebase/firestore";

import { useCountdown } from "@/features/core/hooks/useCountdown";

import { CheckCircle, Heart } from "@tamagui/lucide-icons";

import {
  H2,
  H3,
  H4,
  Paragraph,
  Theme,
  View,
  XStack,
  YStack,
  styled,
} from "tamagui";

interface CountdownBannerProps {
  targetDate: Timestamp;
}
const CountdownBanner: React.FC<CountdownBannerProps> = ({ targetDate }) => {
  const { timeLeft, timeSinceEvent, hasEventPassed, hasEventStarted } =
    useCountdown(targetDate);

  const renderContent = () => {
    if (hasEventPassed()) {
      return (
        <XStack justifyContent="center" gap="$2">
          <Heart size={32} color="white" />
          <H4>Event Has Passed</H4>
        </XStack>
      );
    } else if (hasEventStarted()) {
      return (
        <XStack justifyContent="center" gap="$2">
          <CheckCircle size={32} color="white" />
          <H4>Event Has Started</H4>
        </XStack>
      );
    } else {
      return (
        <XStack justifyContent="space-between" width="100%" marginTop="$4">
          <TimeUnit value={timeLeft.days} label="Days" />
          <Paragraph size={"$6"}>|</Paragraph>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <Paragraph size={"$6"}>|</Paragraph>
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <Paragraph size={"$6"}>|</Paragraph>
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </XStack>
      );
    }
  };

  return (
    <Theme name="surface1">
      <H3 fontWeight="bold">Event starts in:</H3>
      <YStack marginVertical="$2">
        <LinearGradient
          colors={["$pink9Light", "$accentBackground"]}
          start={[0, 0]}
          end={[1, 1]}
          borderRadius="$4"
          padding={2}
        >
          <XStack
            backgroundColor="$background"
            padding="$3"
            borderRadius="$3"
            alignItems="center"
            blockSize="border-box"
          >
            <YStack flex={1} minWidth={0}>
              {renderContent()}
            </YStack>
          </XStack>
        </LinearGradient>
      </YStack>
    </Theme>
  );
};
const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <TimeUnitContainer>
    <Paragraph fontSize={36} lineHeight={36} fontWeight="900" color="white">
      {value.toString().padStart(2, "0")}
    </Paragraph>
    <Paragraph
      fontSize={"$3"}
      fontWeight="600"
      color="white"
      marginTop="$2"
      textTransform="uppercase"
    >
      {label}
    </Paragraph>
  </TimeUnitContainer>
);

const TimeUnitContainer = styled(YStack, {
  alignItems: "center",
  minWidth: 80,
});

export default CountdownBanner;
