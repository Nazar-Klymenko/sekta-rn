import { Search } from "@tamagui/lucide-icons";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useFavoriteEventsId } from "@/hooks/useEvents";
import { useEvents } from "@/hooks/useEvents";
import { useForm } from "react-hook-form";
import { YStack, useTheme } from "tamagui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RetryButton } from "@/components/buttons/IconButtons";
import { EventCard } from "@/components/event/EventCard";
import { SkeletonEventCard } from "@/components/event/SkeletonEventCard";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PageContainer } from "@/components/layout/PageContainer";
import { Typography } from "@/components/Typography";
import { debounce } from "lodash";

const searchEventsSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchEventsSchema>;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const { data: likedEvents } = useFavoriteEventsId();

  const methods = useForm<FormValues>({
    resolver: yupResolver(searchEventsSchema),
    defaultValues: {
      searchQuery: "",
    },
    mode: "onBlur",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isLoading,
    refetch,
  } = useEvents(searchQuery);

  useEffect(() => {
    const debouncedSearch = debounce((value: string) => {
      setSearchQuery(value);
    }, 300);

    const subscription = methods.watch((value) => {
      debouncedSearch(value.searchQuery || "");
    });

    return () => {
      subscription.unsubscribe();
      debouncedSearch.cancel();
    };
  }, [methods]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (status === "error") {
    return (
      <YStack flex={1} justifyContent="flex-start" alignItems="center">
        <Typography variant="body1">
          Error: {(error as Error).message}
        </Typography>
        <RetryButton onPress={() => refetch()} size="lg" />
      </YStack>
    );
  }

  const flattenedEvents = data?.pages.flatMap((page) => page) || [];

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}
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
            paddingTop="$4"
            flexDirection="row"
            ai={"center"}
          >
            <Input
              flex={1}
              placeholder="Search events"
              name="searchQuery"
              id="search-events"
              label=""
              icon={Search}
            />
          </Form>
        }
        ListEmptyComponent={() => (
          <Typography variant="body1">
            No events found. Pull to refresh or check back later.
          </Typography>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={theme.accentColor.get()} />
          ) : null
        }
      />
    </PageContainer>
  );
}
