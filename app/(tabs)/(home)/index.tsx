import { Search } from "@tamagui/lucide-icons";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useFavoriteEventsId } from "@/hooks/useEvents";
import { useEvents } from "@/hooks/useEvents";
import { useForm } from "react-hook-form";
import { YStack, XStack } from "tamagui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventCard } from "@/components/event/EventCard";
import { SkeletonEventCard } from "@/components/event/SkeletonEventCard";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PageContainer } from "@/components/layout/PageContainer";
import { RetryButton } from "@/components/buttons/IconButtons";
import { Typography } from "@/components/Typography";
import { debounce } from "lodash";

const searchEventsSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchEventsSchema>;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: likedEvents } = useFavoriteEventsId();
  const loadMoreRef = useRef(null);

  const methods = useForm<FormValues>({
    resolver: yupResolver(searchEventsSchema),
    defaultValues: {
      searchQuery: "",
    },
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const events = data?.pages.flatMap((page) => page) || [];

  return (
    <PageContainer>
      <Form methods={methods}>
        <Input
          placeholder="Search events (coming soon)"
          name="searchQuery"
          id="search-events"
          label=""
          icon={Search}
          disabled
        />
      </Form>

      <XStack flexWrap="wrap" justifyContent="space-between">
        {isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <YStack key={index} width="100%" marginBottom="$4">
                  <SkeletonEventCard />
                </YStack>
              ))
          : events.map((event) => (
              <YStack key={event.id} width="100%" marginBottom="$4">
                <EventCard
                  event={event}
                  hrefSource="event"
                  isLiked={likedEvents?.includes(event.id) || false}
                />
              </YStack>
            ))}
      </XStack>

      {events.length === 0 && !isLoading && (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Typography variant="body1">
            No events found. Try a different search term.
          </Typography>
          <RetryButton onPress={() => refetch()} size="lg" />
        </YStack>
      )}

      {(isFetchingNextPage || hasNextPage) && (
        <YStack ref={loadMoreRef} height={20} />
      )}

      {isFetchingNextPage && (
        <Typography variant="body1">Loading more events...</Typography>
      )}
    </PageContainer>
  );
}
