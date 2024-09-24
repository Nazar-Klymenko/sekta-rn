import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";
import { useEffect, useState } from "react";

import { Timestamp } from "firebase/firestore";

import {
  CheckCircle,
  Clock,
  Heart,
  HeartCrack,
  XCircle,
} from "@tamagui/lucide-icons";

import {
  H2,
  SizableText,
  View,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

const CountdownBanner: React.FC<CountdownBannerProps> = ({ targetDate }) => {
  const timeLeft = useCountdown(targetDate);
  const theme = useTheme();

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <TimeUnitContainer>
      <GlassContainer>
        <SizableText fontSize={36} fontWeight="900" color="white">
          {value.toString().padStart(2, "0")}
        </SizableText>
      </GlassContainer>
      <SizableText
        fontSize={16}
        fontWeight="600"
        color="white"
        marginTop="$2"
        textTransform="uppercase"
      >
        {label}
      </SizableText>
    </TimeUnitContainer>
  );

  const renderContent = () => {
    const currentTime = new Date().getTime();
    const eventTime = targetDate.toDate().getTime();
    const timeSinceEvent = currentTime - eventTime;
    const eightHoursInMs = 8 * 60 * 60 * 1000;

    if (timeSinceEvent > eightHoursInMs) {
      // More than 8 hours after start
      return (
        <StatusContainer>
          <Heart size={32} color="white" />
          <StatusText>Event Has Passed</StatusText>
        </StatusContainer>
      );
    } else if (timeSinceEvent > 0) {
      // Event has started but within 8 hours
      return (
        <StatusContainer>
          <CheckCircle size={32} color="white" />
          <StatusText>Event Has Started</StatusText>
        </StatusContainer>
      );
    } else {
      // Event hasn't started yet
      return (
        <>
          <XStack justifyContent="space-between" width="100%" marginTop="$4">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
          </XStack>
        </>
      );
    }
  };

  return (
    <CountdownContainer>
      <H2 fontWeight="bold">Event starts in:</H2>
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
        <LinearGradient
          colors={[theme.accentColor.get(), "$pink9Light"]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <ContentWrapper>{renderContent()}</ContentWrapper>
        </LinearGradient>
      </View>
    </CountdownContainer>
  );
};

interface CountdownBannerProps {
  targetDate: Timestamp;
}

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetDate: Timestamp): TimeLeft => {
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
        total: difference, // This will be negative for passed events
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

  return timeLeft;
};

const CountdownContainer = styled(YStack, {
  width: "100%",
  elevation: 10,
  gap: "$2",
});

const ContentWrapper = styled(YStack, {
  padding: "$4",
});

const TimeUnitContainer = styled(YStack, {
  alignItems: "center",
  minWidth: 80,
});

const GlassContainer = styled(YStack, {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: 15,
  padding: "$3",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  borderWidth: 2,
  borderColor: "rgba(255, 255, 255, 0.3)",
});

const StatusContainer = styled(XStack, {
  alignItems: "center",
  justifyContent: "center",
});

const StatusText = styled(SizableText, {
  fontSize: 24,
  fontWeight: "900",
  color: "white",
  marginLeft: "$2",
  textTransform: "uppercase",
  letterSpacing: 1,
});

export default CountdownBanner;
