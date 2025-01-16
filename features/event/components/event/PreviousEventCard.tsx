import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import React from "react";

import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Paragraph, SizableText, XStack, YStack, styled } from "tamagui";

import { Tag } from "@/features/core/components/Tag";
import { DisplayEvent } from "@/features/event/models/Event";

interface PreviousEventCardProps {
  event: DisplayEvent;
}

const PreviousEventCard: React.FC<PreviousEventCardProps> = ({ event }) => {
  const router = useRouter();

  const formattedDate = formatFirestoreTimestamp(event.date, "dd MMM yyyy");

  return (
    <CardContainer onPress={() => router.push(`/events/${event.uid}`)}>
      <ImageStyled source={{ uri: event?.image?.publicUrl }} />
      <ContentContainer>
        <YStack>
          <SizableText fontSize="$8" fontWeight="700" numberOfLines={1}>
            {event.title.display}
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
  animation: {
    type: "quickest",
  },
  pressStyle: {
    scale: 0.98,
  },
});
const ImageStyled = styled(Image, {
  aspectRatio: 1,
  objectFit: "cover",
  maxWidth: 724,
  width: 120,
  marginEnd: "$3",
  borderRadius: "$2",
});
const ContentContainer = styled(YStack, {
  justifyContent: "space-between",
  flex: 1,
});

export default PreviousEventCard;
