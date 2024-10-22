import React, { useState } from "react";

import {
  ActionSheetIOS,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";

import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useDeletePlaySubmission } from "@/features/play/hooks/useDeletePlaySubmission";
import { PlaySubmission } from "@/features/play/models/PlaySubmission";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

// Assuming you're using Tamagui's Dropdown
import { CheckCircle, Copy, MoreHorizontal } from "@tamagui/lucide-icons";
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

import {
  AnimatePresence,
  Button,
  Card,
  H4,
  Paragraph,
  ScrollView,
  Separator,
  Stack,
  Theme,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useNavigation } from "expo-router";

export function SubmissionDetailScreen() {
  const params = useLocalSearchParams();
  const deleteSubmissionMutation = useDeletePlaySubmission();
  const navigation = useNavigation();
  const theme = useTheme();
  const handleDelete = () => {
    Alert.alert(
      "Delete Submission",
      "Are you sure you want to delete this submission?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteSubmissionMutation.mutate(params.id.toString(), {
              onSuccess: () => {
                navigation.goBack();
              },
            });
          },
        },
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete}>
          <Paragraph
            style={{ color: theme.accentColor.get(), marginRight: 10 }}
          >
            Delete
          </Paragraph>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <PageContainer>
      <Card bordered padding="$4" elevation="$1">
        <YStack gap="$2">
          <InfoRow
            icon={<Mail size={20} color="$color9" />}
            label="Email"
            value={params.email as string}
          />
          <InfoRow
            icon={<Phone size={20} color="$color9" />}
            label="Phone"
            value={params.phone as string}
          />
          <Separator marginVertical="$2" />
          <InfoRow
            icon={<Music size={20} color="$color9" />}
            label="SoundCloud"
            value={params.soundcloud as string}
          />
          <InfoRow
            icon={<Youtube size={20} color="$color9" />}
            label="YouTube"
            value={params.youtube as string}
          />
          <InfoRow
            icon={<Instagram size={20} color="$color9" />}
            label="Instagram"
            value={params.instagram as string}
          />
          <InfoRow
            icon={<Facebook size={20} color="$color9" />}
            label="Facebook"
            value={params.facebook as string}
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
              {(params.additionalInfo as string) || "-"}
            </Paragraph>
          </YStack>
          <Separator marginVertical="$2" />
          <InfoRow
            icon={<Clock size={20} color="$color9" />}
            label="Submitted At"
            value={params.submittedAt as string}
          />
        </YStack>
      </Card>
    </PageContainer>
  );
}
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value || value === "-") return;

    try {
      await Clipboard.setStringAsync(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <XStack gap="$4" alignItems="center" paddingVertical="$2">
      {icon}
      <YStack flex={1}>
        <Paragraph size="$2" color="$color9">
          {label}
        </Paragraph>
        <Paragraph size="$3" color="$color12">
          {value || "-"}
        </Paragraph>
      </YStack>
      {value && value !== "-" && (
        <Button
          icon={copied ? CheckCircle : Copy}
          size="$2"
          chromeless
          circular
          onPress={handleCopy}
          pressStyle={{ opacity: 0.7 }}
          opacity={copied ? 1 : 0.5}
          hoverStyle={{ opacity: 0.8 }}
          style={{ alignItems: "center", justifyContent: "center" }} // Center icon
        />
      )}
    </XStack>
  );
};
