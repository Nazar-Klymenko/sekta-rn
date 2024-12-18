import React from "react";

import { useWindowDimensions } from "react-native";

import { Tag } from "@/features/core/components/Tag";
import { DisplayEvent } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Clock, MapPin } from "@tamagui/lucide-icons";

import { Image, SizableText, Stack, XStack, YStack, styled } from "tamagui";

import { useRouter } from "expo-router";

interface UpcomingEventCardProps {
  event: DisplayEvent;
  verticalView?: boolean;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  event,
  verticalView,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const cardWidth = (windowWidth - 32) * 0.9;

  const router = useRouter();

  const formattedDate = formatFirestoreTimestamp(event.date, "EEE, MMM d");
  const formattedTime = formatFirestoreTimestamp(event.date, "HH:mm");

  return (
    <CardContainer
      width={verticalView ? "100%" : cardWidth}
      onPress={() => router.navigate(`/events/${event.uid}`)}
    >
      <ImageContainer>
        <Image
          source={{ uri: event.image.publicUrl }}
          width={verticalView ? "100%" : cardWidth}
          aspectRatio={1}
          borderRadius="$2"
        />
      </ImageContainer>
      <ContentContainer>
        <SizableText
          fontSize={24}
          lineHeight={28}
          fontWeight="700"
          numberOfLines={2}
        >
          {event.title.display}
        </SizableText>
        <XStack alignItems="center">
          <Clock size={16} color="grey" marginEnd={8} />
          <SizableText fontSize={15} color="grey">
            {formattedDate} • {formattedTime}
          </SizableText>
        </XStack>
        <XStack alignItems="center">
          <MapPin size={16} color="grey" marginEnd={8} />
          <SizableText fontSize={15} color="grey">
            {event.location || "Venue TBA"}
          </SizableText>
        </XStack>
        <SizableText
          fontSize={14}
          color="$gray11Light"
          numberOfLines={2}
          marginTop="$2"
        >
          {event.caption}
        </SizableText>
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
  borderRadius: "$2",
  overflow: "hidden",
  marginVertical: 10,
  pressStyle: {
    scale: 0.98,
  },
  hoverStyle: {
    scale: 1.02,
  },
});

const ImageContainer = styled(Stack, {
  position: "relative",
});

const ContentContainer = styled(YStack, {
  paddingVertical: 24,
  paddingHorizontal: 4,
  gap: 8,
});

export default UpcomingEventCard;
