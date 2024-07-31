import { SlidersHorizontal } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { ActivityIndicator, FlatList, Platform } from "react-native";

import { fetchFilteredEvents } from "@/api/firestore";
import { useEventCollection, useEvents } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { Stack, useRouter } from "expo-router";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { Button, Text, YStack, useTheme } from "tamagui";

import { FilterDialog, FilterValues } from "@/components/FilterDialog";
import { EventCard } from "@/components/event/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

const ITEMS_PER_PAGE = 1;

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    priceSort: false,
    selectedGenres: [],
    selectedArtists: [],
    upcomingOnly: false,
  });

  const { data: likedEvents } = useEventCollection();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    isLoading,
  } = useInfiniteQuery(
    ["events", filters],
    async ({ pageParam = 0 }) => {
      const events = await fetchFilteredEvents(
        filters,
        pageParam,
        ITEMS_PER_PAGE
      );
      return events;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === ITEMS_PER_PAGE ? pages.length : undefined;
      },
    }
  );

  const flattenedEvents = data?.pages.flat() || [];

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const appliedFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "boolean") return value;
    return value !== null;
  }).length;

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    queryClient.resetQueries(["events", newFilters]);
  };

  const handleResetFilters = () => {
    setFilters({
      priceSort: false,
      selectedGenres: [],
      selectedArtists: [],
      upcomingOnly: false,
    });
    queryClient.resetQueries(["events"]);
  };

  if (status === "loading") return <FullPageLoading />;
  if (status === "error")
    return (
      <PageContainer>
        <Text>Error: {(error as Error).message}</Text>
      </PageContainer>
    );

  return (
    <PageContainer scrollable={false} fullWidth>
      <Stack.Screen
        options={{
          headerRight: () => (
            <YStack
              position="relative"
              justifyContent="center"
              alignItems="center"
              marginHorizontal={Platform.OS === "web" ? "$4" : "unset"}
            >
              <Button
                size="$3"
                icon={SlidersHorizontal}
                circular
                onPress={() => setOpen(true)}
                theme="active"
              />
              {appliedFiltersCount > 0 && (
                <YStack
                  position="absolute"
                  top={-5}
                  right={-5}
                  backgroundColor="$red10Dark"
                  borderRadius={10}
                  width={20}
                  height={20}
                  justifyContent="center"
                  alignItems="center"
                  zIndex={1}
                >
                  <Text color="white" fontSize={10}>
                    {appliedFiltersCount}
                  </Text>
                </YStack>
              )}
            </YStack>
          ),
        }}
      />
      <FlatList
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={Platform.OS == "web"}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={flattenedEvents}
        renderItem={({ item: event }) => (
          <YStack style={{ maxWidth: 720 }}>
            <EventCard
              event={event}
              hrefSource="event"
              isLiked={likedEvents?.includes(event.id) || false}
            />
          </YStack>
        )}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => (
          <Text>No events found. Pull to refresh or check back later.</Text>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={theme.accentColor.get()} />
          ) : null
        }
      />
      <FilterDialog
        open={open}
        onOpenChange={setOpen}
        events={flattenedEvents}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
    </PageContainer>
  );
}
