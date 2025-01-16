import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import React from "react";

import { useRouter } from "expo-router";
import { Image, SizableText, Stack, XStack, YStack, styled } from "tamagui";

import { DisplayResident } from "../models/Resident";

interface ResidentCardProps {
  resident: DisplayResident;
}

const ResidentCard = ({ resident }: ResidentCardProps) => {
  const router = useRouter();

  return (
    <CardContainer
      width={"100%"}
      onPress={() => router.navigate(`/events/residents/${resident.id}`)}
    >
      <ImageContainer>
        <Image
          source={{ uri: resident.image.publicUrl }}
          width={"100%"}
          aspectRatio={1}
          borderRadius="$2"
        />
      </ImageContainer>
      <ContentContainer>
        <SizableText
          fontSize={"$9"}
          lineHeight={28}
          fontWeight="700"
          numberOfLines={2}
        >
          {resident.name.display}
        </SizableText>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled(YStack, {
  borderRadius: "$2",
  overflow: "hidden",
  marginVertical: 10,
  animation: {
    type: "quickest",
  },
  pressStyle: {
    scale: 0.98,
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

export default ResidentCard;
