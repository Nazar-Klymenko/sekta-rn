import React from "react";

import { PrimaryButton } from "@/shared/components/buttons/PrimaryButton";
import { Form } from "@/shared/components/form/Form";
import { Input } from "@/shared/components/form/Input";
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

import { Text } from "tamagui";

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

export function PlayForm() {
  const toast = useToastController();
  const playSubmission = useSubmitPlay();
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
    <Form methods={methods} maxWidth={740} flex={1}>
      <Text fontSize={20} fontWeight="bold">
        Contact Information
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
      <PrimaryButton
        onPress={methods.handleSubmit(onSubmit)}
        text="Send application"
        isLoading={playSubmission.isPending}
        disabled={playSubmission.isPending}
      />
    </Form>
  );
}
