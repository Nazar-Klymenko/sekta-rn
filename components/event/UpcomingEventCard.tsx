import { Clock, MapPin } from "@tamagui/lucide-icons";

import React from "react";

import { Event } from "@/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { useRouter } from "expo-router";
import { Image, Stack, Text, XStack, YStack, styled, useTheme } from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import { Tag } from "@/components/Tag";

interface UpcomingEventCardProps {
  event: Event;
  isLiked: boolean;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  event,
  isLiked,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const formattedDate = formatFirestoreTimestamp(event.date, "EEE, MMM d");
  const formattedTime = formatFirestoreTimestamp(event.date, "HH:mm");
  const formattedDay = formatFirestoreTimestamp(event.date, "dd");
  const formattedMonth = formatFirestoreTimestamp(event.date, "MMM");

  return (
    <CardOuterContainer onPress={() => router.push(`/events/${event.id}`)}>
      <CardInnerContainer>
        <ImageContainer>
          <Image
            source={{ uri: event.image.publicUrl }}
            width={360}
            height={240}
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
          <Text
            fontSize="$7"
            fontWeight="bold"
            numberOfLines={2}
            color="$color"
          >
            {event.title}
          </Text>
          <XStack alignItems="center" space="$2">
            <Clock size={16} color={theme.gray11Light.get()} />
            <Text fontSize="$3" color="$gray11Light">
              {formattedDate} • {formattedTime}
            </Text>
          </XStack>
          <XStack alignItems="center" space="$2">
            <MapPin size={16} color={theme.gray11Light.get()} />
            <Text fontSize="$3" color="$gray11Light">
              {event.location || "Venue TBA"}
            </Text>
          </XStack>
          <Text
            fontSize="$4"
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
      </CardInnerContainer>
    </CardOuterContainer>
  );
};

const CardOuterContainer = styled(YStack, {
  width: 360,
  marginVertical: 10,
  marginHorizontal: 5,
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 10,
  pressStyle: {
    shadowOpacity: 0.4,
    elevation: 15,
    scale: 0.98,
  },
  hoverStyle: {
    scale: 1.03,
    shadowOpacity: 0.4,
  },
});

const CardInnerContainer = styled(YStack, {
  borderRadius: "$6",
  overflow: "hidden",
  backgroundColor: "$backgroundStrong",
});

const ImageContainer = styled(Stack, {
  position: "relative",
});

const DateBadge = styled(YStack, {
  position: "absolute",
  top: 20,
  left: 20,
  backgroundColor: "$accentColor",
  borderRadius: "$6",
  paddingHorizontal: 16,
  paddingVertical: 10,
  alignItems: "center",
});

const PriceBadge = styled(YStack, {
  position: "absolute",
  top: 20,
  right: 20,
  backgroundColor: "rgba(0,0,0,0.7)",
  borderRadius: "$5",
  paddingHorizontal: 16,
  paddingVertical: 10,
});

const ContentContainer = styled(YStack, {
  padding: "$4",
  gap: "$2",
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
