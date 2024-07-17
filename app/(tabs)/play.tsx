import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Calendar,
  Facebook,
  Instagram,
  Mail,
  Music2,
  Phone,
  Youtube,
} from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { KeyboardAvoidingView, Platform } from "react-native";

import { usePlaySubmission } from "@/hooks/usePlay";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, ScrollView, Spinner, Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PortfolioLinkInput } from "@/components/form/PortfolioLinkInput";

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
    placeholder: "username",
    prefix: true,
  },
  {
    name: "soundcloud",
    label: "Soundcloud",
    icon: Music2,
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
    }),
    { handleSubmit, formState } = methods;

  const {
    mutate: submitPlayInfo,
    isLoading,
    isError,
    isSuccess,
  } = usePlaySubmission();

  const onSubmit = async (data: PlayData) => {
    try {
      submitPlayInfo(data);
      console.log("Play info submitted successfully!");
      methods.reset();
    } catch (error) {
      console.error("Error submitting play info:", error);
    }
  };
  return (
    <PageContainer>
      <Form methods={methods}>
        <Text fontSize={24} fontWeight="bold">
          Play a set at our venue! 🎵
        </Text>
        <Text fontSize="$4">
          Leave your information below and we will get in touch asap
        </Text>
        <Input
          id="play-email"
          name="email"
          label="Contact Email"
          placeholder="email@gmail.com"
        />
        <Input
          id="play-phone"
          name="phone"
          label="Phone Number (Optional)"
          placeholder="577 925 024"
        />
        <Text fontSize={20} fontWeight="bold">
          Portfolio Links (Optional)
        </Text>
        {portfolioLinks.map(
          ({ name, icon, placeholder, prefix, label }, idx) => (
            <PortfolioLinkInput
              id={"play-" + name}
              key={idx}
              label={label}
              name={name}
              icon={icon}
              placeholder={placeholder}
              prefix={prefix}
            />
          )
        )}
        <Input
          id="play-additional-info"
          name="additionalInfo"
          label="Additional Info"
          multiline
          placeholder="Any additional information you'd like to share..."
          numberOfLines={4}
          verticalAlign="top"
        />
        <PrimaryButton
          onPress={handleSubmit(onSubmit)}
          text="Send application 🎸"
          isLoading={isLoading}
          disabled={isLoading}
        />
        {isError && <Text>Error submitting play info</Text>}
        {isSuccess && <Text>Play info submitted successfully!</Text>}
      </Form>
    </PageContainer>
  );
}
