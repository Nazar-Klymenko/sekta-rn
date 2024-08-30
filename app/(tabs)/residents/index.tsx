import React from "react";
import { useResidents } from "@/hooks/useResidents";
import { ResidentCard } from "@/components/ResidentCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Text, useMedia } from "tamagui";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { FlatList, View } from "react-native";
import { ResidentData } from "@/models/ResidentData";

export default function ResidentScreen() {
  const { data: residents, isLoading, error } = useResidents();
  const media = useMedia();

  if (isLoading) return <FullPageLoading />;
  if (error) {
    return (
      <PageContainer>
        <Text>Error loading residents: {error.message}</Text>
      </PageContainer>
    );
  }

  const renderItem = ({ item: resident }: { item: ResidentData }) => (
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
          <Text
            fontSize={40}
            fontWeight="bold"
            textAlign="center"
            marginBottom="$4"
          >
            Residents
          </Text>
        }
      />
    </PageContainer>
  );
}
