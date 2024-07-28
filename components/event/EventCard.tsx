import { Heart } from "@tamagui/lucide-icons";

import React, { useEffect, useState } from "react";

import { GestureResponderEvent } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useToggleEventLike } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { format } from "date-fns";
import { Link, usePathname, useRouter } from "expo-router";
import {
  Button,
  Image,
  Paragraph,
  Text,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import { Tag } from "@/components/Tag";

import { LikeButton } from "./LikeButton";

interface EventCardProps {
  event: Event;
  hrefSource: "event" | "favourite";
  isLiked: boolean;
}

const CardContainer = styled(YStack, {
  padding: "$4",
  borderRadius: "$4",
  overflow: "hidden",
  marginVertical: "$3",
  alignSelf: "center",
  width: "100%",
  cursor: "pointer",
});

const DateContainer = styled(XStack, {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: "$2",
  padding: "$1",
  paddingHorizontal: "$2",
});
const DateBadge = styled(YStack, {
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: "$accentColor",
  borderRadius: "$1",
  padding: "$2",
  opacity: 0.9,
  width: 50,
  alignItems: "center",
});
export const EventCard: React.FC<EventCardProps> = ({
  event,
  hrefSource,
  isLiked = false,
}) => {
  const formattedDate = format(new Date(event.date), "dd MMM yyyy • HH:mm");
  const formattedDayName = format(new Date(event.date), "EEE");
  const formattedDay = format(new Date(event.date), "dd");
  const toggleLike = useToggleEventLike();
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [optimisticIsLiked, setOptimisticIsLiked] = useState(isLiked);
  const pathname = usePathname();

  useEffect(() => {
    setOptimisticIsLiked(isLiked);
  }, [isLiked]);

  const handleLike = (
    e: React.TouchEvent | React.MouseEvent | GestureResponderEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      router.push({ pathname: "/auth/login", params: { returnTo: pathname } });
    } else {
      setOptimisticIsLiked((prev) => !prev);
      toggleLike.mutate(
        { eventId: event.id, isLiked: optimisticIsLiked },
        {
          onError: () => {
            setOptimisticIsLiked((prev) => !prev);
          },
        }
      );
    }
  };
  return (
    <CardContainer onPress={() => router.push(`/${hrefSource}/${event.id}`)}>
      <YStack position="relative" borderRadius={"$4"} overflow="hidden">
        <Image source={{ uri: event.image.publicUrl }} aspectRatio={16 / 9} />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
          start={[0, 0]}
          end={[0, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
          }}
        />
        <DateBadge>
          <Text fontSize={12} fontWeight="bold" color="white">
            {formattedDayName.toUpperCase()}
          </Text>
          <Text fontSize={18} fontWeight="bold" color="white">
            {formattedDay}
          </Text>
        </DateBadge>
        <XStack
          position="absolute"
          bottom={10}
          left={10}
          right={10}
          justifyContent="space-between"
          alignItems="center"
        >
          <YStack>
            <Text fontSize="$6" fontWeight="bold" color="white">
              {event.title}
            </Text>
            <DateContainer marginTop="$1">
              <Text fontSize="$3" color="white">
                {formattedDate}
              </Text>
            </DateContainer>
          </YStack>

          <LikeButton
            isLiked={optimisticIsLiked}
            handleLike={handleLike}
            size="sm"
          />
        </XStack>
      </YStack>
      <YStack paddingTop="$4" backgroundColor="$backgroundStrong">
        <Paragraph color="$gray10Light" numberOfLines={2} ellipsizeMode="tail">
          {event.caption}
        </Paragraph>
        <XStack flexWrap="wrap" gap="$2" marginTop="$2">
          {event.genres.slice(0, 3).map((genre, index) => (
            <Tag tag={genre} key={index} />
          ))}
          {event.genres.length > 3 && (
            <Tag tag={`+${event.genres.length - 3}`} />
          )}
        </XStack>
      </YStack>
    </CardContainer>
  );
};
