import React from "react";

import { FlatList, View } from "react-native";

import { ResidentCard } from "@/features/core/components/ResidentCard";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { H1, SizableText, useMedia } from "tamagui";

import { useResidents } from "./hooks/useResidents";
import { Resident } from "./models/Resident";

export default function ResidentListScreen() {
  const { data: residents, isLoading, error } = useResidents();
  const media = useMedia();

  if (isLoading) return <FullPageLoading />;
  if (error) {
    return (
      <PageContainer>
        <SizableText>Error loading residents: {error.message}</SizableText>
      </PageContainer>
    );
  }

  const renderItem = ({ item: resident }: { item: Resident }) => (
    <View style={{ flex: 1, margin: 8 }}>
      <ResidentCard resident={resident} />
    </View>
  );

  return (
    <PageContainer scrollable={false}>
      <FlatList
        style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}
        data={residents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={media.gtMd ? 3 : media.gtSm ? 2 : 1}
        columnWrapperStyle={
          media.gtSm ? { justifyContent: "space-between" } : undefined
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListHeaderComponent={
          <H1 fontWeight="bold" textAlign="center" marginBottom="$4">
            Residents
          </H1>
        }
      />
    </PageContainer>
  );
}
