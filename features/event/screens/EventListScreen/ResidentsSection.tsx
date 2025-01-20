import fallbackImage from "@/assets/images/logo-big.png";
import { InfiniteData } from "@tanstack/react-query";

import React from "react";

import { ScrollView } from "react-native";

import { useRouter } from "expo-router";
import { Avatar, SizableText, YStack } from "tamagui";

import { View, getTokens } from "@tamagui/core";

import SectionHeaderWithAction from "@/features/core/components/SectionHeaderWithAction";
import { ResidentAvatar } from "@/features/residents/components/ResidentAvatar";
import { DisplayResident } from "@/features/residents/models/Resident";

interface ResidentsSectionProps {
  residents: DisplayResident[] | undefined;
  isResidentsLoading: boolean;
  onViewAllPress: () => void;
}

export const ResidentsSection: React.FC<ResidentsSectionProps> = ({
  residents,
  isResidentsLoading,
  onViewAllPress,
}) => {
  const padding = getTokens().space.$4.val;
  const router = useRouter();
  return (
    <YStack>
      <SectionHeaderWithAction
        title="Our Residents"
        onActionPress={onViewAllPress}
        paddingHorizontal={16}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: padding,
          paddingHorizontal: padding,
          gap: padding,
        }}
        snapToInterval={0}
        decelerationRate="fast"
        snapToAlignment="center"
      >
        {isResidentsLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <SizableText key={index}>Resident loading..</SizableText>
              ))
          : residents?.map((resident, index) => (
              <ResidentAvatar
                key={index}
                resident={resident}
                onPress={() =>
                  router.navigate(`/events/residents/${resident.id}`)
                }
              />
            ))}
      </ScrollView>
    </YStack>
  );
};
