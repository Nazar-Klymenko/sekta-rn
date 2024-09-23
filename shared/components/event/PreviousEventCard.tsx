import React from "react";

import { Tag } from "@/shared/components/Tag";
import { LikeButton } from "@/shared/components/buttons/IconButtons";
import { Event } from "@/shared/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Image, Text, XStack, YStack, styled, useTheme } from "tamagui";

import { useRouter } from "expo-router";

interface PreviousEventCardProps {
  event: Event;
}

const PreviousEventCard: React.FC<PreviousEventCardProps> = ({ event }) => {
  const theme = useTheme();
  const router = useRouter();

  const formattedDate = formatFirestoreTimestamp(event.date, "dd MMM yyyy");

  return (
    <CardContainer onPress={() => router.push(`/events/${event.id}`)}>
      <Image
        source={{ uri: event.image.publicUrl }}
        width={100}
        height={100}
        borderRadius="$6"
      />
      <ContentContainer>
        <YStack flex={1} gap="$2">
          <Text fontSize="$4" fontWeight="bold" numberOfLines={1}>
            {event.title}
          </Text>
          <Text fontSize="$3" color="$gray10Light">
            {formattedDate}
          </Text>
          <XStack flexWrap="wrap" gap="$2">
            {event.genres.slice(0, 2).map((genre, index) => (
              <Tag tag={genre} key={genre + index} />
            ))}
            {event.genres.length > 2 && (
              <Tag tag={`+${event.genres.length - 2}`} />
            )}
          </XStack>
        </YStack>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled(XStack, {
  width: "100%",
  borderRadius: "$6",
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "$gray2Dark",
  backgroundColor: "$background",
  padding: "$2",
  gap: "$3",
  alignItems: "center",
  elevation: "$1",
  pressStyle: {
    elevation: "$3",
    borderColor: "$borderColorHover",
  },
  hoverStyle: {
    borderColor: "$borderColorHover",
  },
});

const ContentContainer = styled(XStack, {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
});

export default PreviousEventCard;
