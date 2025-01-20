import fallbackImage from "@/assets/images/logo-big.png";

import React from "react";

import { Avatar, SizableText, Stack, styled } from "tamagui";

import { DisplayResident } from "../models/Resident";

interface ResidentAvatarProps {
  resident: DisplayResident;
  onPress?: () => void;
}
export const ResidentAvatar = ({ resident, onPress }: ResidentAvatarProps) => {
  return (
    <CardContainer onPress={onPress}>
      <Avatar borderRadius={"$2"} size="$12">
        <Avatar.Image
          accessibilityLabel={resident?.image?.altText || ""}
          src={resident?.image?.publicUrl}
        />
        <Avatar.Fallback delayMs={600} backgroundColor={"$accent"} />
      </Avatar>
      <SizableText
        position="absolute"
        bottom={0}
        width="100%"
        textAlign="left"
        fontWeight="700"
        fontSize={"$8"}
        padding="$2"
      >
        {resident?.name?.display}
      </SizableText>
    </CardContainer>
  );
};
const CardContainer = styled(Stack, {
  position: "relative",
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
