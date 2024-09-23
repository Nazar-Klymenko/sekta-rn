import { Timestamp } from "firebase/firestore";

import React, { useEffect, useState } from "react";

import { Text, YStack } from "tamagui";

interface CountdownTimerProps {
  targetDate: Timestamp;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
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

  const timerComponents = Object.entries(timeLeft).map(
    ([interval, value]) =>
      value > 0 && (
        <Text key={interval}>
          {value} {interval}{" "}
        </Text>
      ),
  );

  return (
    <YStack>
      <Text fontSize="$3" fontWeight="bold">
        Event starts in:
      </Text>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <Text>Event has started!</Text>
      )}
    </YStack>
  );
};

export default CountdownTimer;
