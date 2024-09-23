import { Timestamp } from "firebase/firestore";

import React from "react";
// useCountdown.ts
import { useEffect, useState } from "react";

import { Card, Text, XStack, YStack } from "tamagui";

// We'll create this hook

interface CountdownBannerProps {
  targetDate: Timestamp;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  targetDate,
}) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <YStack alignItems="center" width={60}>
      <Text fontSize={24} fontWeight="bold" color="$color">
        {value.toString().padStart(2, "0")}
      </Text>
      <Text fontSize={12} color="$color">
        {label}
      </Text>
    </YStack>
  );

  return (
    <Card
      elevate
      size="$4"
      bordered
      animation="bouncy"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      backgroundColor="$backgroundHover"
    >
      <Card.Header padded>
        <Text fontSize={16} fontWeight="bold" color="$color">
          Event Starts In
        </Text>
      </Card.Header>
      <Card.Footer padded>
        <XStack justifyContent="space-between" width="100%">
          <TimeUnit value={days} label="Days" />
          <TimeUnit value={hours} label="Hours" />
          <TimeUnit value={minutes} label="Minutes" />
          <TimeUnit value={seconds} label="Seconds" />
        </XStack>
      </Card.Footer>
    </Card>
  );
};

export default CountdownBanner;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Timestamp) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.toDate().getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
