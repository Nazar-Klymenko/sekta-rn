import { useEffect, useState } from "react";

import { Timestamp } from "firebase/firestore";

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Timestamp) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.toDate().getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        total: difference,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return {
        total: difference,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Calculate time since event
  const timeSinceEvent = new Date().getTime() - targetDate.toDate().getTime();
  const eightHoursInMs = 8 * 60 * 60 * 1000;

  // Helper functions
  const hasEventPassed = (): boolean => timeSinceEvent > eightHoursInMs;
  const hasEventStarted = (): boolean => timeSinceEvent > 0;

  return { timeLeft, timeSinceEvent, hasEventPassed, hasEventStarted };
};
