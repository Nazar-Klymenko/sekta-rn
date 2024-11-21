import React, { useState } from "react";

import { Timestamp } from "firebase/firestore";

import { TouchableOpacity } from "react-native";

import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useDeletePlaySubmission } from "@/features/play/hooks/useDeletePlaySubmission";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import {
  Clock,
  Facebook,
  Info,
  Instagram,
  Mail,
  Music,
  Phone,
  Youtube,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import { Card, Paragraph, Separator, XStack, YStack, useTheme } from "tamagui";

import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";

import { InfoRow } from "./InfoRow";
import { MenuSheet } from "./MenuSheet";

export function SubmissionDetailScreen() {
  const { id, submission } = useLocalSearchParams<{
    id: string;
    submission: string;
  }>();
  const parsedSubmission = JSON.parse(submission);

  const router = useRouter();
  const theme = useTheme();
  const toast = useToastController();
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const { mutate, isPending } = useDeletePlaySubmission();

  const handleDelete = () => {
    mutate(id.toString(), {
      onSuccess: () => {
        setShowConfirmSheet(false);
        router.back();
      },
      onError: () => {
        setShowConfirmSheet(false);
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowConfirmSheet(true)}>
              <Paragraph
                theme={"accent"}
                color="$background"
                style={{ marginRight: 10 }}
              >
                Delete
              </Paragraph>
            </TouchableOpacity>
          ),
        }}
      />
      <PageContainer>
        <Card bordered padding="$4" elevation="$1">
          <YStack gap="$2">
            <InfoRow
              icon={<Mail size={20} color="$color9" />}
              label="Email"
              value={parsedSubmission.email as string}
            />
            <InfoRow
              icon={<Phone size={20} color="$color9" />}
              label="Phone"
              value={parsedSubmission.phone as string}
            />
            <Separator marginVertical="$2" />
            <InfoRow
              icon={<Music size={20} color="$color9" />}
              label="SoundCloud"
              value={parsedSubmission.soundcloud as string}
            />
            <InfoRow
              icon={<Youtube size={20} color="$color9" />}
              label="YouTube"
              value={parsedSubmission.youtube as string}
            />
            <InfoRow
              icon={<Instagram size={20} color="$color9" />}
              label="Instagram"
              value={parsedSubmission.instagram as string}
            />
            <InfoRow
              icon={<Facebook size={20} color="$color9" />}
              label="Facebook"
              value={parsedSubmission.facebook as string}
            />
            <Separator marginVertical="$2" />

            <YStack gap="$2">
              <XStack gap="$2" alignItems="center">
                <Info size={20} color="$color9" />
                <Paragraph size="$2" color="$color9">
                  Additional Information
                </Paragraph>
              </XStack>
              <Paragraph
                size="$3"
                color="$color12"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {(parsedSubmission.additionalInfo as string) || "-"}
              </Paragraph>
            </YStack>
            <Separator marginVertical="$2" />
            <InfoRow
              icon={<Clock size={20} color="$color9" />}
              label="Submitted At"
              value={
                parsedSubmission.submittedAt
                  ? formatFirestoreTimestamp(
                      new Timestamp(
                        parsedSubmission.submittedAt.seconds,
                        parsedSubmission.submittedAt.nanoseconds
                      ),
                      "EEEE, MMMM do yyyy, HH:mm"
                    )
                  : undefined
              }
            />
          </YStack>
        </Card>
      </PageContainer>
      <MenuSheet
        isPending={isPending}
        open={showConfirmSheet}
        onOpenChange={setShowConfirmSheet}
        confirmFunction={handleDelete}
      />
    </>
  );
}
