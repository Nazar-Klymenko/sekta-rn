import DateTimePicker from "@react-native-community/datetimepicker";
import {
  AudioLines,
  Calendar,
  Facebook,
  Instagram,
  Mail,
  Music,
  Music2,
  Phone,
  Youtube,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import React, { useState } from "react";

import { KeyboardAvoidingView, Platform } from "react-native";

import { usePlaySubmission } from "@/hooks/usePlay";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, ScrollView, Spinner, Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PageContainer } from "@/components/layout/PageContainer";

const playSchema = yup.object({
  email: yup.string().email("Invalid email address").required(),
  phone: yup.string().optional(),
  soundcloud: yup.string().optional(),
  youtube: yup.string().optional(),
  instagram: yup.string().optional(),
  facebook: yup.string().optional(),
  additionalInfo: yup.string().optional(),
});

type FormValues = yup.InferType<typeof playSchema>;

const portfolioLinks = [
  {
    name: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "@username",
  },
  {
    name: "soundcloud",
    label: "Soundcloud",
    icon: AudioLines,
    placeholder: "https://soundcloud.com/",
  },
  {
    name: "youtube",
    label: "Youtube",
    icon: Youtube,
    placeholder: "https://www.youtube.com/",
  },
  {
    name: "facebook",
    label: "Facebook",
    icon: Facebook,
    placeholder: "https://www.facebook.com/",
  },
];

export default function PlayScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const theme = useTheme();
  const toast = useToastController();

  const methods = useForm<FormValues>({
    resolver: yupResolver(playSchema),
    defaultValues: {
      email: "",
      phone: "",
      soundcloud: "",
      youtube: "",
      instagram: "",
      facebook: "",
      additionalInfo: "",
    },
  });

  const { handleSubmit, formState } = methods;

  const playSubmission = usePlaySubmission();

  const onSubmit = async (data: FormValues) => {
    playSubmission.mutate(data, {
      onSuccess: () => {
        toast.show("Application Submitted", {
          message: "Your play info has been submitted successfully!",
          variant: "success",
        });
        methods.reset();
      },
      onError: (error) => {
        toast.show("Submission Failed", {
          message: error instanceof Error ? error.message : "An error occurred",
          variant: "error",
        });
      },
    });
  };

  return (
    <PageContainer formContainer>
      <Form methods={methods}>
        <Text fontSize={24} fontWeight="bold">
          Play a set at our venue! 🎵
        </Text>
        <Text fontSize="$4" color="$gray10Light">
          Leave your information below and we will get in touch asap
        </Text>
        <Input
          id="play-email"
          name="email"
          label="Contact Email"
          placeholder="email@gmail.com"
          icon={Mail}
        />

        <Input
          id="play-phone"
          name="phone"
          label="Phone Number (Optional)"
          placeholder="+48 577 925 024"
          icon={Phone}
        />
        <Text fontSize={20} fontWeight="bold">
          Portfolio Links (Optional)
        </Text>
        {portfolioLinks.map(({ name, icon, placeholder, label }, idx) => (
          <Input
            id={"play-" + name}
            key={name + idx}
            label={label}
            name={name}
            icon={icon}
            placeholder={placeholder}
          />
        ))}
        <Input
          id="play-additional-info"
          name="additionalInfo"
          label="Additional Info"
          multiline
          placeholder="Any additional information you'd like to share..."
          rows={4}
          verticalAlign="top"
        />
        <PrimaryButton
          onPress={handleSubmit(onSubmit)}
          text="Send application"
          isLoading={playSubmission.isPending}
          disabled={playSubmission.isPending}
        />
        {playSubmission.isError && <Text>Error submitting play info</Text>}
        {playSubmission.isSuccess && (
          <Text>Play info submitted successfully!</Text>
        )}
      </Form>
    </PageContainer>
  );
}
