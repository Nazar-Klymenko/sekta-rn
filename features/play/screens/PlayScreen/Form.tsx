import React from "react";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { emailSchema } from "@/utils/validationSchemas";

import {
  AudioLines,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Youtube,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import { H2, Paragraph, Separator } from "tamagui";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSubmitPlay } from "../../hooks/useSubmitPlay";

const playSchema = yup.object({
  email: emailSchema,
  phone: yup.string().optional(),
  soundcloud: yup.string().optional(),
  youtube: yup.string().optional(),
  instagram: yup.string().optional(),
  facebook: yup.string().optional(),
  additionalInfo: yup
    .string()
    .optional()
    .max(1000, "Please keep it shorter 👽"),
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
    placeholder: "soundcloud.com/",
  },
  {
    name: "youtube",
    label: "Youtube",
    icon: Youtube,
    placeholder: "youtube.com/",
  },
  {
    name: "facebook",
    label: "Facebook",
    icon: Facebook,
    placeholder: "facebook.com/",
  },
];

export function PlayForm() {
  const toast = useToastController();
  const { mutate, isPending } = useSubmitPlay();
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
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    mutate(data, {
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
    <Form methods={methods} maxWidth={740} flex={1}>
      <H2>Contact Information</H2>
      <Input
        id="play-email"
        name="email"
        label="Contact Email"
        placeholder="email@gmail.com"
        inputMode="email"
        autoCapitalize="none"
        icon={Mail}
      />
      <Input
        id="play-phone"
        name="phone"
        label="Phone Number (Optional)"
        placeholder="+48 577 925 024"
        inputMode="tel"
        icon={Phone}
      />
      <Separator />

      <H2>Portfolio Links (Optional)</H2>

      {portfolioLinks.map(({ name, icon, placeholder, label }, idx) => (
        <Input
          key={name + idx}
          id={"play-" + name}
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
        rows={6}
        verticalAlign="top"
        maxLength={1000}
      />

      <ButtonCTA
        theme="accent"
        onPress={methods.handleSubmit(onSubmit)}
        isLoading={isPending}
        disabled={isPending}
      >
        Send application
      </ButtonCTA>
    </Form>
  );
}
