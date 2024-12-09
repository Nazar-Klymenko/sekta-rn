import React from "react";

import { useWindowDimensions } from "react-native";

import { Tag } from "@/features/core/components/Tag";
import { DisplayEvent } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Clock, MapPin } from "@tamagui/lucide-icons";

import {
  Image,
  Paragraph,
  Stack,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

import { useRouter } from "expo-router";

interface UpcomingEventCardProps {
  event: DisplayEvent;
  verticalView?: boolean;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ event }) => {
  const theme = useTheme();
  const router = useRouter();

  const formattedDate = formatFirestoreTimestamp(event.date, "EEE, MMM d");
  const formattedTime = formatFirestoreTimestamp(event.date, "HH:mm");

  return (
    <CardContainer
      width={"100%"}
      onPress={() => router.push(`/events/${event.uid}`)}
    >
      <ImageContainer>
        <Image
          source={{ uri: event.image.publicUrl }}
          width={"100%"}
          aspectRatio={1}
          borderRadius="$2"
        />
      </ImageContainer>
      <ContentContainer>
        <Paragraph
          fontSize={24}
          lineHeight={24}
          fontWeight="700"
          numberOfLines={2}
          color="$color"
        >
          {event.title.display}
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
    </CardContainer>
  );
};

const CardContainer = styled(YStack, {
  borderRadius: "$2",
  overflow: "hidden",
  marginVertical: 10,
  flexBasis: "100%",
  maxWidth: "100%",
  $gtMd: {
    maxWidth: "calc(33.333% - 16px)",
  },
  $gtSm: {
    maxWidth: "calc(50% - 16px)",
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
