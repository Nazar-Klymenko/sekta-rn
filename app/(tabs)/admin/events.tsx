// src/pages/AdminPlaySubmissions.tsx
import {
  AudioLines,
  Calendar,
  Facebook,
  Info,
  Instagram,
  Mail,
  Music,
  Phone,
  Trash2,
  Youtube,
} from "@tamagui/lucide-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import React, { useState } from "react";

import { Alert, FlatList, Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import {
  useDeletePlaySubmission,
  useFetchPlaySubmissions,
} from "@/hooks/usePlay";
import { PlayData } from "@/models/PlayData";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import {
  Button,
  Card,
  Paragraph,
  ScrollView,
  Spinner,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function AdminPlaySubmissions() {
  const { user } = useAuth();
  const { data: submissions, isLoading, isError } = useFetchPlaySubmissions();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const queryClient = useQueryClient();

  const deleteSubmissionMutation = useDeletePlaySubmission();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Submission",
      "Are you sure you want to delete this submission?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteSubmissionMutation.mutate(id, {
              onSuccess: () => {
                setToastMessage("Submission deleted successfully");
                setShowToast(true);
              },
              onError: (error) => {
                setToastMessage("Error deleting submission");
                setShowToast(true);
              },
            });
          },
        },
      ]
    );
  };

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Text>Error</Text>;

  const renderItem = ({ item }: { item: PlayData }) => {
    let formattedDate;
    if (item.submittedAt) {
      formattedDate = formatFirestoreTimestamp(
        item.submittedAt,
        "EEEE, MMMM do yyyy, HH:mm"
      );
    }

    return (
      <Card
        elevate
        size="$4"
        bordered
        marginVertical="$2"
        padding="$4"
        maxWidth={740}
        minWidth={540}
      >
        <YStack gap="$2">
          <XStack gap="$2" alignItems="center">
            <Mail size={18} color="$gray10Light" />
            <Text color="$gray10Light">Mail: </Text>
            <Text fontSize="$5">{item.email}</Text>
          </XStack>
          {item.phone && (
            <XStack gap="$2" alignItems="center">
              <Phone size={18} color="$gray10Light" />
              <Text color="$gray10Light">Mail: </Text>
              <Text>{item.phone}</Text>
            </XStack>
          )}
          {item.soundcloud && (
            <XStack gap="$2" alignItems="center">
              <AudioLines size={18} color="$gray10Light" />
              <Text color="$gray10Light">phone: </Text>
              <Text>{item.soundcloud}</Text>
            </XStack>
          )}
          {item.youtube && (
            <XStack gap="$2" alignItems="center">
              <Youtube size={18} color="$gray10Light" />
              <Text color="$gray10Light">youtube: </Text>
              <Text>{item.youtube}</Text>
            </XStack>
          )}
          {item.instagram && (
            <XStack gap="$2" alignItems="center">
              <Instagram size={18} color="$gray10Light" />
              <Text color="$gray10Light">instagram: </Text>
              <Text>{item.instagram}</Text>
            </XStack>
          )}
          {item.facebook && (
            <XStack gap="$2" alignItems="center">
              <Facebook size={18} color="$gray10Light" />
              <Text color="$gray10Light">facebook: </Text>
              <Text>{item.facebook}</Text>
            </XStack>
          )}
          {item.additionalInfo && (
            <YStack gap="$1">
              <XStack gap="$2" alignItems="center">
                <Info size={18} color="$gray10Light" />
                <Text color="$gray10Light">Additional Info:</Text>
              </XStack>
              <Paragraph>{item.additionalInfo}</Paragraph>
            </YStack>
          )}
          {item.submittedAt && (
            <YStack gap="$1">
              <XStack gap="$2" alignItems="center">
                <Calendar size={18} color="$gray10Light" />
                <Text color="$gray10Light">Date of submission:</Text>
              </XStack>
              <Paragraph>{formattedDate}</Paragraph>
            </YStack>
          )}
        </YStack>
        <Button
          icon={Trash2}
          marginTop="$3"
          onPress={() => handleDelete(item.id)}
        >
          Delete Submission
        </Button>
      </Card>
    );
  };

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={Platform.OS == "web"}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </PageContainer>
  );
}
