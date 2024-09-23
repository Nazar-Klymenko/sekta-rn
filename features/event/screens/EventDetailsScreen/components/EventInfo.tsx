import React from "react";

import { Event } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Calendar, CreditCard, MapPin } from "@tamagui/lucide-icons";

import { H1, H2, XStack, YStack } from "tamagui";

import { InfoItem } from "./InfoItem";

export default function EventInfo({ event }: { event: Event }) {
  const formattedDate = formatFirestoreTimestamp(
    event.date,
    "EEEE, MMMM do yyyy",
  );
  const formattedTime = formatFirestoreTimestamp(event.date, "HH:mm");

  return (
    <YStack gap="$4">
      <H1 fontWeight="bold" color="white" flex={1}>
        {event.title}
      </H1>
      <XStack display="flex" flex={1} gap="$4">
        <YStack gap="$4" flex={1} width="100%">
          <InfoItem
            icon={<Calendar color="$accentColor" size={24} />}
            title="Date"
            value={`${formattedDate} • ${formattedTime}`}
          />
          <InfoItem
            icon={<MapPin color="$accentColor" size={24} />}
            title="Location"
            value={event.location}
          />
          <InfoItem
            icon={<CreditCard color="$accentColor" size={24} />}
            title="Price"
            value={event.price === 0 ? "FREE" : `${event.price} PLN`}
          />
        </YStack>
      </XStack>
    </YStack>
  );
}
