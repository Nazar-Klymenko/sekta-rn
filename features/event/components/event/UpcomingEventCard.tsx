import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { Tag } from "@/features/core/components/Tag";
import { Event } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Clock, MapPin } from "@tamagui/lucide-icons";

import {
  Image,
  Paragraph,
  Stack,
  TamaguiProvider,
  Theme,
  ThemeableStack,
  XStack,
  YStack,
  styled,
  useTheme,
  useWindowDimensions,
} from "tamagui";

import { useRouter } from "expo-router";

interface UpcomingEventCardProps {
  event: Event;
  cardWidth: number;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  event,
  cardWidth,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const formattedDate = formatFirestoreTimestamp(event.date, "EEE, MMM d");
  const formattedTime = formatFirestoreTimestamp(event.date, "HH:mm");
  const formattedDay = formatFirestoreTimestamp(event.date, "dd");
  const formattedMonth = formatFirestoreTimestamp(event.date, "MMM");

  return (
    <CardContainer
      onPress={() => router.push(`/events/${event.id}`)}
      width={cardWidth}
    >
      <ImageContainer>
        <Image
          source={{ uri: event.image.publicUrl }}
          width={cardWidth}
          height={cardWidth * 0.9}
        />
        <LinearGradient
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0)"]}
          start={[0, 0]}
          end={[0, 1]}
        />
        <DateBadge>
          <Paragraph color="white" fontSize="$7" fontWeight="bold">
            {formattedDay}
          </Paragraph>
          <Paragraph color="white" fontSize="$3" textTransform="uppercase">
            {formattedMonth}
          </Paragraph>
        </DateBadge>
        <PriceBadge>
          <Paragraph color="white" fontSize="$4" fontWeight="bold">
            {event.price === 0
              ? "FREE"
              : isNaN(event.price)
                ? "N/A"
                : `${event.price} PLN`}
          </Paragraph>
        </PriceBadge>
      </ImageContainer>
      <TamaguiProvider defaultTheme={"dark"}>
        <ContentContainer theme="surface1">
          <ContentContainer theme="surface2">
            <ContentContainer theme="surface3">
              <ContentContainer theme="light_accent_surface1">
                <Paragraph
                  fontSize={24}
                  lineHeight={24}
                  fontWeight="bold"
                  numberOfLines={2}
                  color="$color"
                >
                  Surface 4
                </Paragraph>
              </ContentContainer>
              <Paragraph
                fontSize={24}
                lineHeight={24}
                fontWeight="bold"
                numberOfLines={2}
                color="$color"
              >
                Surface 3
              </Paragraph>
            </ContentContainer>
            <Paragraph
              fontSize={24}
              lineHeight={24}
              fontWeight="bold"
              numberOfLines={2}
              color="$color"
            >
              Surface 2
            </Paragraph>
          </ContentContainer>
          <Paragraph
            fontSize={24}
            lineHeight={24}
            fontWeight="bold"
            numberOfLines={2}
            color="$color"
          >
            Surface 1
          </Paragraph>
          <XStack alignItems="center" gap="$2">
            <Clock size={16} color={theme.gray11Light.get()} />
            <Paragraph fontSize={15} color="$gray11Light">
              {formattedDate} • {formattedTime}
            </Paragraph>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <MapPin size={16} color={theme.gray11Light.get()} />
            <Paragraph fontSize={15} color="$gray11Light">
              {event.location || "Venue TBA"}
            </Paragraph>
          </XStack>
          <Paragraph
            fontSize={14}
            color="$gray11Light"
            numberOfLines={2}
            marginTop="$2"
          >
            {event.caption}
          </Paragraph>
          <XStack flexWrap="wrap" gap="$2" marginTop="$3">
            {event.genres.slice(0, 3).map((genre, index) => (
              <Tag key={genre + index} tag={genre} />
            ))}
            {event.genres.length > 3 && (
              <Tag tag={`+${event.genres.length - 3}`} />
            )}
          </XStack>
        </ContentContainer>
      </TamaguiProvider>
    </CardContainer>
  );
};

const CardContainer = styled(YStack, {
  borderRadius: "$6",
  overflow: "hidden",
  borderColor: "$gray2Dark",
  elevation: "$1",
  marginVertical: 10,
  pressStyle: {
    elevation: 8,
    scale: 0.98,
  },
  hoverStyle: {
    scale: 1.02,
    elevation: 8,
  },
  borderWidth: 1,
});

const ImageContainer = styled(Stack, {
  position: "relative",
});

const DateBadge = styled(YStack, {
  position: "absolute",
  top: 16,
  left: 16,
  backgroundColor: "rgba(0,0,0,0.7)",
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 10,
  alignItems: "center",
});

const PriceBadge = styled(YStack, {
  position: "absolute",
  top: 16,
  right: 16,
  backgroundColor: "rgba(0,0,0,0.7)",
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 10,
});

const ContentContainer = styled(YStack, {
  backgroundColor: "$background",

  paddingVertical: 24,
  paddingHorizontal: 18,
  gap: 8,
});

export default UpcomingEventCard;
{
  /* <LinearGradient
  position="absolute"
  top="0"
  left="0"
  right="0"
  bottom="0"
  colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0)"]}
  start={[0, 0]}
  end={[0, 1]}
/>; */
}
