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

import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";

import { FormProvider, useForm } from "react-hook-form";
import { Button, ScrollView, Spinner, Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { Input } from "@/components/form/Input";
import { PortfolioLinkInput } from "@/components/form/PortfolioLinkInput";

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
];
const playSchema = yup.object({
  email: yup.string().email("Invalid email address"),
  phone: yup.string().optional(),
  date: yup.date(),
  soundcloud: yup.string().optional(),
  youtube: yup.string().optional(),
  instagram: yup.string().optional(),
  facebook: yup.string().optional(),
});

type FormValues = yup.InferType<typeof playSchema>;

export default function StorybookScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const methods = useForm<FormValues>({
    resolver: yupResolver(playSchema),
    defaultValues: {
      email: "",
      phone: "",
      date: new Date(),
      soundcloud: "",
      youtube: "",
      instagram: "",
      facebook: "",
    },
  });
  return (
    <PageContainer>
      <FormProvider {...methods}>
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          Let's Play! 🎵
        </Text>
        <Text fontSize={20} fontWeight="bold">
          Portfolio Links (Optional)
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
          Portfolio Inputs
        </Text>
        {portfolioLinks.map(({ name, icon, placeholder, prefix, label }) => (
          <PortfolioLinkInput
            key={name}
            name={name}
            label={label}
            icon={icon}
            placeholder={placeholder}
            prefix={prefix}
          />
        ))}
        <Text fontSize={20} fontWeight="bold">
          Buttons
        </Text>
        <Button
          size="$7"
          height={50}
          pressStyle={{ scale: 0.97 }}
          animation="quick"
          onPress={() => {}}
          icon={<Spinner />}
        >
          <Text fontSize={20} fontWeight="bold">
            Let's Rock! 🎸
          </Text>
        </Button>
        <Button
          size="$7"
          height={50}
          pressStyle={{ scale: 0.97 }}
          animation="quick"
          onPress={() => {
            setIsLoading((s) => !s);
          }}
          icon={isLoading ? <Spinner /> : undefined}
        >
          <Text fontSize={20} fontWeight="bold">
            Let's Rock! 🎸
          </Text>
        </Button>
        <Button
          size="$7"
          height={50}
          pressStyle={{ scale: 0.97 }}
          animation="quick"
          onPress={() => {}}
          disabled={true}
          icon={<Spinner />}
        >
          <Text fontSize={20} fontWeight="bold">
            Let's Rock! 🎸
          </Text>
        </Button>
      </FormProvider>
    </PageContainer>
  );
}
