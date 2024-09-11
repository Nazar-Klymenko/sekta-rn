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

  const formattedDate = formatFirestoreTimestamp(event.date, "dd MMM");
  const formattedTime = formatFirestoreTimestamp(event.date, "HH:mm");
  const formattedDay = formatFirestoreTimestamp(event.date, "dd");
  const formattedMonth = formatFirestoreTimestamp(event.date, "MMM");

  return (
    <CardContainer onPress={() => router.push(`/events/${event.id}`)}>
      <ImageContainer>
        <Image
          source={{ uri: event.image.publicUrl }}
          width={360}
          height={220}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0)"]}
          start={[0, 0]}
          end={[0, 0.5]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 100,
          }}
        />
        <DateBadge>
          <Text color="white" fontSize="$5" fontWeight="bold">
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
        <Text fontSize="$6" fontWeight="bold" numberOfLines={2} color="$color">
          {event.title}
        </Text>
        <Text fontSize="$4" color="$gray11Light" numberOfLines={2}>
          {event.caption}
        </Text>
        <Text fontSize="$3" color="$gray10Light">
          {formattedTime}
        </Text>
        <XStack flexWrap="wrap" gap="$2" marginTop="$2">
          {event.genres.slice(0, 3).map((genre, index) => (
            <Tag tag={genre} key={genre + index} />
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
  width: 360,
  borderRadius: "$4",
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "$borderColor",
  backgroundColor: "$backgroundHover",
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
  pressStyle: {
    shadowOpacity: 0.2,
    elevation: 8,
    scale: 0.98,
  },
  hoverStyle: {
    borderColor: "$borderColorHover",
    scale: 1.02,
  },
});

const ImageContainer = styled(Stack, {
  position: "relative",
});

const DateBadge = styled(YStack, {
  position: "absolute",
  top: 0,
  left: 20,
  backgroundColor: "$accentColor",
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  alignItems: "center",
});

const PriceBadge = styled(YStack, {
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "rgba(0,0,0,0.6)",
  borderRadius: 8,
  padding: 8,
});

const ContentContainer = styled(YStack, {
  padding: "$4",
  gap: "$2",
});

export default UpcomingEventCard;
