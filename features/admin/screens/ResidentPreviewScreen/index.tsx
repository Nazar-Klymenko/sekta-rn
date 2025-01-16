import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import React, { useState } from "react";

import { Linking, TouchableOpacity } from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  H6,
  Image,
  Separator,
  SizableText,
  XStack,
  YStack,
} from "tamagui";

import {
  CalendarCog,
  CalendarPlus,
  Captions,
  Hash,
  Link,
  Link2,
  MoreHorizontal,
} from "@tamagui/lucide-icons";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Skeleton from "@/features/core/components/Skeleton";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";
import { InfoItem } from "@/features/event/screens/EventDetailsScreen/InfoItem";
import { useFetchResident } from "@/features/residents/hooks/useFetchResident";

import { useDeleteResident } from "../../hooks/useDeleteResident";
import { InnerMenuSheet } from "./InnerMenuSheet";
import { OuterMenuSheet } from "./OuterMenuSheet";

const ResidentPreviewScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: resident, isLoading, isError } = useFetchResident(id);
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [innershowConfirmSheet, setInnerShowConfirmSheet] = useState(false);
  const { mutate, isPending } = useDeleteResident(id);

  if (isLoading) {
    return (
      <PageContainer>
        <SkeletonResidentDetails />
      </PageContainer>
    );
  }

  if (isError || !resident) {
    return (
      <YStack padding="$4" alignItems="center" gap="$4">
        <SizableText>Failed to load resident details.</SizableText>
        <Button>Retry</Button>
      </YStack>
    );
  }

  console.log({ resident });
  const handleSocialMediaPress = (url: string) => {
    Linking.openURL(url);
  };
  const handleDelete = () => {
    mutate(resident, {
      onSuccess: () => {
        setShowConfirmSheet(false);
        setInnerShowConfirmSheet(false);
      },
      onError: () => {
        setShowConfirmSheet(false);
        setInnerShowConfirmSheet(false);
      },
    });
  };
  const createdAtDate = formatFirestoreTimestamp(
    resident?.timestamps?.createdAt,
    "EEEE, MMMM do yyyy"
  );
  const createdAtTime = formatFirestoreTimestamp(
    resident?.timestamps?.createdAt,
    "HH:mm"
  );

  const updatedAtDate = formatFirestoreTimestamp(
    resident?.timestamps?.updatedAt,
    "EEEE, MMMM do yyyy"
  );
  const createdTime = formatFirestoreTimestamp(
    resident?.timestamps?.updatedAt,
    "HH:mm"
  );
  return (
    <>
      <Stack.Screen
        options={{
          title: resident.name.display,
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowConfirmSheet(true)}>
              <MoreHorizontal color="$accentColor" />
            </TouchableOpacity>
          ),
        }}
      />
      <PageContainer>
        <YStack gap="$4">
          <Image
            source={{ uri: resident?.image?.publicUrl }}
            aspectRatio={1 / 1}
            objectFit="cover"
            maxWidth={724}
            flex={1}
            width={"100%"}
          />
          <YStack>
            <H6>name:</H6>
            <SizableText fontSize="$6" color="$gray11" fontWeight={700}>
              {resident?.name?.display}
            </SizableText>
          </YStack>
          <YStack>
            <H6>bio:</H6>
            <SizableText fontSize="$6" color="$gray11" fontWeight={700}>
              {resident?.bio}
            </SizableText>
          </YStack>

          <Separator />
          <H6>Debugging</H6>
          <InfoItem
            icon={<Hash color="$accentColor" size={24} />}
            title="Event id:"
            value={resident?.id}
          />
          <InfoItem
            icon={<CalendarPlus color="$accentColor" size={24} />}
            title="Created at:"
            value={`${createdAtDate} • ${createdAtTime}`}
          />
          <InfoItem
            icon={<CalendarCog color="$accentColor" size={24} />}
            title="Last updated at:"
            value={`${updatedAtDate} • ${createdTime}`}
          />
          <H6>Image debugging</H6>
          <InfoItem
            icon={<Link2 color="$accentColor" size={24} />}
            title="Image Path:"
            value={resident?.image?.path}
          />
          <InfoItem
            icon={<Link color="$accentColor" size={24} />}
            title="Public Image URL:"
            value={resident?.image?.publicUrl}
          />
          <InfoItem
            icon={<Captions color="$accentColor" size={24} />}
            title="Alt Text Image:"
            value={resident?.image?.altText || "No alt text provided"}
          />
        </YStack>
        {/* Social Media Links
      {Object.entries(resident.socialMedia).length > 0 && (
        <YStack gap="$2">
          <SizableText fontSize="$6" fontWeight="600">
            Connect
          </SizableText>
          <XStack flexWrap="wrap" gap="$2">
            {Object.entries(resident.socialMedia).map(([platform, url]) => (
              <Button
                key={platform}
                size="$3"
                variant="outlined"
                onPress={() => handleSocialMediaPress(url)}
              >
                {platform}
              </Button>
            ))}
          </XStack>
        </YStack>
      )} */}
      </PageContainer>
      <OuterMenuSheet
        key={id + "outer"}
        open={showConfirmSheet}
        onOpenChange={setShowConfirmSheet}
        setInnerShowConfirmSheet={setInnerShowConfirmSheet}
        id={id}
      />
      <InnerMenuSheet
        key={id + "inner"}
        open={innershowConfirmSheet}
        onOpenChange={setInnerShowConfirmSheet}
        confirmFunction={handleDelete}
        isPending={isPending}
      />
    </>
  );
};

export default ResidentPreviewScreen;

const SkeletonResidentDetails = () => {
  return (
    <YStack gap="$4">
      <Skeleton height={300} width="100%" borderRadius="$2" />
      <YStack gap="$2">
        <Skeleton height={32} width="60%" />
        <Skeleton height={100} width="100%" />
      </YStack>
      <Separator />
      <YStack gap="$2">
        <Skeleton height={24} width="30%" />
        <XStack gap="$2">
          <Skeleton height={40} width={100} borderRadius="$4" />
          <Skeleton height={40} width={100} borderRadius="$4" />
        </XStack>
      </YStack>
    </YStack>
  );
};
