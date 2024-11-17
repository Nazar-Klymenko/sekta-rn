import React from "react";

import { Tag } from "@/features/core/components/Tag";
import { Event } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Image, Paragraph, SizableText, XStack, YStack, styled } from "tamagui";

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
        borderRadius="$2"
        marginEnd="$3"
      />
      <ContentContainer>
        <YStack>
          <SizableText fontSize="$8" fontWeight="700" numberOfLines={1}>
            {event.title}
          </SizableText>
          <Paragraph fontSize="$3" color="$gray10Light">
            {formattedDate}
          </Paragraph>
        </YStack>
        <XStack flexWrap="wrap" gap="$2" alignItems="center">
          {event.genres.slice(0, 2).map((genre, index) => (
            <Tag tag={genre} key={genre + index} />
          ))}
          {event.genres.length > 2 && (
            <SizableText fontWeight={600} marginStart="$2">
              {`+${event.genres.length - 2}`}
            </SizableText>
          )}
        </XStack>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled(XStack, {
  padding: "$1",
  marginBottom: "$2",
  pressStyle: {
    scale: 0.98,
  },
});

const ContentContainer = styled(YStack, {
  justifyContent: "space-between",
  flex: 1,
});

export default PreviousEventCard;
