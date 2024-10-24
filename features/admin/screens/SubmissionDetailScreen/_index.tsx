import React, { useState } from "react";

import { Timestamp } from "firebase/firestore";

import { TouchableOpacity } from "react-native";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Sheet } from "@/features/core/components/panels/Sheet";
import { useDeletePlaySubmission } from "@/features/play/hooks/useDeletePlaySubmission";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import {
  CheckCircle,
  Clock,
  Copy,
  Facebook,
  Info,
  Instagram,
  Mail,
  Music,
  Phone,
  Youtube,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import {
  Card,
  Paragraph,
  Separator,
  Theme,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import { Stack, useLocalSearchParams, useNavigation } from "expo-router";

import { InfoRow } from "./InfoRow";

export function SubmissionDetailScreen() {
  const { id, submission } = useLocalSearchParams<{
    id: string;
    submission: string;
  }>();
  const parsedSubmission = JSON.parse(submission);

  console.log(parsedSubmission);
  const navigation = useNavigation();
  const theme = useTheme();
  const toast = useToastController();
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const { mutate, isPending } = useDeletePlaySubmission();

  const handleDelete = () => {
    mutate(id.toString(), {
      onSuccess: () => {
        setShowConfirmSheet(false);
        navigation.goBack();
      },
      onError: () => {
        setShowConfirmSheet(false);
        toast.show("Failed to delete submission. Please try again.", {
          variant: "error",
        });
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
                style={{ color: theme.accentColor.get(), marginRight: 10 }}
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
      <Sheet open={showConfirmSheet} onOpenChange={setShowConfirmSheet}>
        <YStack gap="$4" width="100%">
          <YStack gap="$4" alignItems="center">
            <Paragraph size="$8" fontWeight={700} textAlign="center">
              Delete Submission
            </Paragraph>
            <Paragraph size="$6" textAlign="center">
              Are you sure you want to delete this submission?
            </Paragraph>
            <Separator flex={1} width="100%" />

            <XStack flex={1} width="100%" gap="$4">
              <ButtonCTA
                theme={"surface1"}
                aria-label="Close"
                disabled={isPending}
                onPress={() => setShowConfirmSheet(false)}
                flex={1}
              >
                Cancel
              </ButtonCTA>
              <Theme name="danger">
                <ButtonCTA
                  aria-label="Confirm Sign Out"
                  isLoading={isPending}
                  disabled={isPending}
                  onPress={handleDelete}
                  flex={1}
                >
                  Delete
                </ButtonCTA>
              </Theme>
            </XStack>
          </YStack>
        </YStack>
      </Sheet>
    </>
  );
}
