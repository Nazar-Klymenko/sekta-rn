import React from "react";

import { Resident } from "@/features/residents/models/Resident";

import { Card, Image, Text, XStack, YStack, styled } from "tamagui";

import { useRouter } from "expo-router";

interface ResidentCardProps {
  resident: Resident;
}

export const ResidentCard: React.FC<ResidentCardProps> = ({ resident }) => {
  const router = useRouter();

  return (
    <StyledCard
      elevate
      onPress={() => router.push(`/residents/${resident.id}`)}
    >
      <ImageContainer>
        <Image
          source={{ uri: resident.image.publicUrl }}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </ImageContainer>

      <CardContent>
        <ResidentName>{resident.displayName}</ResidentName>
        <XStack flexWrap="wrap" marginTop={10}>
          {resident.genres.map((genre, index) => (
            <GenreTag key={index}>{genre}</GenreTag>
          ))}
        </XStack>
      </CardContent>
    </StyledCard>
  );
};
const StyledCard = styled(Card, {
  maxWidth: "100%",
  width: 400,
  height: 500,
  borderRadius: "$6",
  overflow: "hidden",
  backgroundColor: "transparent",
  cursor: "pointer",
});

const ImageContainer = styled(YStack, {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
});

const CardContent = styled(YStack, {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 20,
});

const ResidentName = styled(Text, {
  fontSize: 36,
  fontWeight: "900",
  color: "white",
});

const GenreTag = styled(Text, {
  fontSize: 16,
  fontWeight: "bold",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.3)",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 10,
  marginRight: 10,
  marginBottom: 10,
});
