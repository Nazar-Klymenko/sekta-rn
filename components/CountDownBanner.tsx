import { Clock } from "@tamagui/lucide-icons";
import { Timestamp } from "firebase/firestore";

import React from "react";
import { useEffect, useState } from "react";

import { Card, Text, XStack, YStack, styled, useTheme } from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

interface CountdownBannerProps {
  targetDate: Timestamp;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetDate: Timestamp) => {
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

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  targetDate,
}) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  const theme = useTheme();

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <TimeUnitContainer>
      <GlassContainer>
        <Text fontSize={36} fontWeight="900" color="white">
          {value.toString().padStart(2, "0")}
        </Text>
      </GlassContainer>
      <Text
        fontSize={16}
        fontWeight="600"
        color="white"
        marginTop="$2"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </TimeUnitContainer>
  );

  return (
    <CountdownContainer>
      <LinearGradient
        colors={[theme.accentColor.get(), "$pink9Light"]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <ContentWrapper>
          {/* <HeaderContainer>
            <Clock size={32} color="white" />
            <HeaderText>Event Countdown</HeaderText>
          </HeaderContainer> */}
          <XStack justifyContent="space-between" width="100%" marginTop="$4">
            <TimeUnit value={days} label="Days" />
            <TimeUnit value={hours} label="Hours" />
            <TimeUnit value={minutes} label="Mins" />
            <TimeUnit value={seconds} label="Secs" />
          </XStack>
        </ContentWrapper>
      </LinearGradient>
    </CountdownContainer>
  );
};

const CountdownContainer = styled(YStack, {
  width: "100%",
  borderRadius: 20,
  overflow: "hidden",
  elevation: 10,
});

const BackgroundGradient = styled(LinearGradient, {
  borderRadius: 20,
});

const ContentWrapper = styled(YStack, {
  padding: "$4",
});

const HeaderContainer = styled(XStack, {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "$4",
});

const HeaderText = styled(Text, {
  fontSize: 28,
  fontWeight: "900",
  color: "white",
  marginLeft: "$2",
  textTransform: "uppercase",
  letterSpacing: 1,
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

export default CountdownBanner;
