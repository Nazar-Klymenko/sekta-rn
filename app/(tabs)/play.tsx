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

import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, ScrollView, Spinner, Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
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
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <PageContainer>
      <FormProvider {...methods}>
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          Let's Play! 🎵
        </Text>

        <Input
          name="email"
          label="Contact Email"
          placeholder="email@gmail.com"
        />
        <Input
          name="phone"
          label="Phone Number (Optional)"
          placeholder="577 925 024"
        />

        <Text fontSize={20} fontWeight="bold">
          Portfolio Links (Optional)
        </Text>
        {portfolioLinks.map(({ name, icon, placeholder, prefix, label }) => (
          <PortfolioLinkInput
            key={name}
            label={label}
            name={name}
            icon={icon}
            placeholder={placeholder}
            prefix={prefix}
          />
        ))}

        <Input
          name="additionalInfo"
          label="Additional Info"
          multiline
          textAlignVertical="top"
          placeholder="Any additional information you'd like to share..."
          numberOfLines={4}
        />

        <Button
          size="$7"
          height={50}
          pressStyle={{ scale: 0.97 }}
          animation="quick"
          onPress={methods.handleSubmit(onSubmit)}
          icon={methods.formState.isSubmitting ? () => <Spinner /> : undefined}
        >
          <Text fontSize={20} fontWeight="bold">
            Let's Rock! 🎸
          </Text>
        </Button>
      </FormProvider>
    </PageContainer>
  );
}
