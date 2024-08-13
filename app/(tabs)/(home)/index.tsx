// index.tsx
import { Search, SlidersHorizontal } from "@tamagui/lucide-icons";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import React, { useState } from "react";

import { ActivityIndicator, FlatList, Platform } from "react-native";

import { fetchFilteredEvents } from "@/api/events";
import { useFavoriteEventsId } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { Stack, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { FilterDialog, FilterValues } from "@/components/FilterDialog";
import { FilterButton, RetryButton } from "@/components/buttons/IconButtons";
import { EventCard } from "@/components/event/EventCard";
import { SkeletonEventCard } from "@/components/event/SkeletonEventCard";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

const searchEventsSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchEventsSchema>;

const ITEMS_PER_PAGE = 6;

export default function HomeScreen() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(searchEventsSchema),
    defaultValues: {
      searchQuery: "",
    },
  });
  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    priceSort: false,
    selectedGenres: [],
    selectedArtists: [],
    includeOldEvents: false,
  });

  const { data: likedEvents } = useFavoriteEventsId();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    isLoading,
  } = useInfiniteQuery<
    Event[],
    Error,
    InfiniteData<Event[]>,
    [string, FilterValues],
    number
  >({
    queryKey: ["events", filters],
    queryFn: async ({ pageParam }) => {
      const events = await fetchFilteredEvents(
        filters,
        pageParam,
        ITEMS_PER_PAGE
      );
      return events;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === ITEMS_PER_PAGE ? pages.length : undefined;
    },
  });

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
    queryClient.resetQueries({ queryKey: ["events", newFilters] });
  };

  const handleResetFilters = () => {
    setFilters({
      priceSort: false,
      selectedGenres: [],
      selectedArtists: [],
      includeOldEvents: false,
    });
  };
  // if (status === "pending") return <FullPageLoading />;
  if (status === "error")
    return (
      <YStack flex={1} justifyContent="flex-start" alignItems="center">
        <Text>Error: {(error as Error).message}</Text>
        <RetryButton onPress={() => refetch()} size="lg" />
      </YStack>
    );

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={Platform.OS == "web"}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={isLoading ? Array(5).fill({}) : flattenedEvents}
        renderItem={({ item: event }) =>
          isLoading ? (
            <SkeletonEventCard />
          ) : (
            <YStack style={{ maxWidth: 720 }}>
              <EventCard
                event={event}
                hrefSource="event"
                isLiked={likedEvents?.includes(event.id) || false}
              />
            </YStack>
          )
        }
        keyExtractor={(item, index) => item.id || index.toString()}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <Form
            methods={methods}
            style={{ maxWidth: 720 }}
            paddingHorizontal="$4"
            paddingTop="$4"
            flexDirection="row"
            ai={"center"}
          >
            <Input
              flex={1}
              placeholder="Search events"
              name="search-events"
              id="search-events"
              label=""
              icon={Search}
            />
            <FilterButton
              setOpen={setOpen}
              appliedFiltersCount={appliedFiltersCount}
            />
          </Form>
        }
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
        currentFilters={filters}
      />
    </PageContainer>
  );
}
