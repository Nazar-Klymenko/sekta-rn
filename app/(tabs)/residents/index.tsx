import {
  AudioLines,
  Facebook,
  Instagram,
  Type as LucideIcon,
  Mail,
  MapPin,
  Phone,
  Square,
  Youtube,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import React from "react";

import { Platform } from "react-native";

import { usePlaySubmission } from "@/hooks/usePlay";

import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Image,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
  useTheme,
  useWindowDimensions,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import Animated, { FadeInDown } from "react-native-reanimated";
import { emailSchema } from "@/utils/validationSchemas";
import { PageContainer } from "@/components/layout/PageContainer";

export default function PlayScreen() {
  const theme = useTheme();
  const toast = useToastController();
  const playSubmission = usePlaySubmission();

  return (
    <PageContainer>
      <Text fontSize={40} fontWeight="bold" textAlign="center">
        Residents
      </Text>
    </PageContainer>
  );
}
