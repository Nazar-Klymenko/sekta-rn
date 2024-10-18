import React from "react";

import { Tag } from "@/features/core/components/Tag";
import { Event } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Image, Paragraph, XStack, YStack, styled } from "tamagui";

import { useRouter } from "expo-router";

interface PreviousEventCardProps {
  event: Event;
}

const PreviousEventCard: React.FC<PreviousEventCardProps> = ({ event }) => {
  const router = useRouter();

  const formattedDate = formatFirestoreTimestamp(event.date, "dd MMM yyyy");

  return (
    <CardContainer onPress={() => router.push(`/events/${event.id}`)}>
      <Image
        source={{ uri: event.image.publicUrl }}
        width={120}
        aspectRatio={1}
        borderRadius="$6"
      />
      <ContentContainer>
        <YStack>
          <Paragraph fontSize="$8" fontWeight="700">
            {event.title}
          </Paragraph>
          <Paragraph fontSize="$3" color="$gray10Light">
            {formattedDate}
          </Paragraph>
        </YStack>
        <XStack flexWrap="wrap" gap="$2">
          {event.genres.slice(0, 2).map((genre, index) => (
            <Tag tag={genre} key={genre + index} />
          ))}
          {event.genres.length > 2 && (
            <Tag tag={`+${event.genres.length - 2}`} />
          )}
        </XStack>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled(XStack, {
  borderRadius: "$6",

  borderColor: "$gray2Dark",

  padding: "$2",
  marginBottom: "$2",
  gap: "$3",
  elevation: "$1",
  pressStyle: {
    elevation: "$3",
    borderColor: "$borderColorHover",
  },
  hoverStyle: {
    borderColor: "$borderColorHover",
  },
});

const ContentContainer = styled(YStack, {
  justifyContent: "space-between",
});

export default PreviousEventCard;
