import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { Tag } from "@/shared/components/Tag";
import { Event } from "@/shared/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Clock, MapPin } from "@tamagui/lucide-icons";

import {
  Image,
  Stack,
  Text,
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
  const { width: windowWidth } = useWindowDimensions();

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
          height={240}
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
          <Text color="white" fontSize="$7" fontWeight="bold">
            {formattedDay}
          </Text>
          <Text color="white" fontSize="$3" textTransform="uppercase">
            {formattedMonth}
          </Text>
        </DateBadge>
        <PriceBadge>
          <Text color="white" fontSize="$4" fontWeight="bold">
            {event.price === 0 ? "FREE" : `${event.price} PLN`}
          </Text>
        </PriceBadge>
      </ImageContainer>
      <ContentContainer>
        <Text fontSize={24} fontWeight="bold" numberOfLines={2} color="$color">
          {event.title}
        </Text>
        <XStack alignItems="center" gap="$2">
          <Clock size={16} color={theme.gray11Light.get()} />
          <Text fontSize={15} color="$gray11Light">
            {formattedDate} • {formattedTime}
          </Text>
        </XStack>
        <XStack alignItems="center" gap="$2">
          <MapPin size={16} color={theme.gray11Light.get()} />
          <Text fontSize={15} color="$gray11Light">
            {event.location || "Venue TBA"}
          </Text>
        </XStack>
        <Text
          fontSize={14}
          color="$gray11Light"
          numberOfLines={2}
          marginTop="$2"
        >
          {event.caption}
        </Text>
        <XStack flexWrap="wrap" gap="$2" marginTop="$3">
          {event.genres.slice(0, 3).map((genre, index) => (
            <Tag key={genre + index} tag={genre} />
          ))}
          {event.genres.length > 3 && (
            <Tag tag={`+${event.genres.length - 3}`} />
          )}
        </XStack>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled(YStack, {
  borderRadius: "$6",
  overflow: "hidden",
  borderColor: "$gray2Dark",
  backgroundColor: "$background",
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
  backgroundColor: "$accentColor",
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
  padding: 16,
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
