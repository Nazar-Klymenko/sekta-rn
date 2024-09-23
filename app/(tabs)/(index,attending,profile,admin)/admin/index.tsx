import React, { useState } from "react";

import { Timestamp } from "firebase/firestore";

import { MenuItem } from "@/shared/components/buttons/MenuItem";
import { Input as FormInput } from "@/shared/components/form/Input";
import { PageContainer } from "@/shared/components/layout/PageContainer";

import {
  BoomBox,
  ChevronRight,
  Play,
  Ticket,
  Users,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import { Button, Input, Spinner, Text, XStack, YStack, styled } from "tamagui";

import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const eventSchema = yup.object({
  title: yup.string().required("Title is required"),
  date: yup.date().required("Date is required"),
  caption: yup.string().required("Caption is required"),
  genres: yup.array().of(yup.string()).min(1, "At least one genre is required"),
  lineup: yup
    .array()
    .of(yup.string())
    .min(1, "At least one artist is required"),
  price: yup.number().positive("Price must be a positive number"),
  location: yup.string().required("Location is required"),
});

type EventFormValues = yup.InferType<typeof eventSchema>;

export default function EventCreationPage() {
  const { control, handleSubmit, reset } = useForm<EventFormValues>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      caption: "",
      genres: [],
      lineup: [],
      price: 0,
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  //   const { mutateAsync: uploadImage } = useUploadEventImage();
  //   const { mutateAsync: createEvent } = useCreateEvent();
  //   const toast = useToastController();
  const router = useRouter();

  const onSubmit = async (formData: EventFormValues) => {};

  return (
    <PageContainer formContainer>
      <Text fontSize={24} fontWeight="bold">
        Admin page
      </Text>
      <YStack gap="$2">
        <MenuItem
          title="All Events"
          onPress={() => router.push("/admin/events")}
          icon={Ticket}
        />
        <MenuItem
          title="All Residents"
          onPress={() => router.push("/admin/residents")}
          icon={BoomBox}
        />
        <MenuItem
          title="All play submissions"
          onPress={() => router.push("/admin/submissions")}
          icon={Play}
        />
        <MenuItem
          title="All users"
          onPress={() => router.push("/admin/userlist")}
          icon={Users}
        />
      </YStack>
    </PageContainer>
  );
}
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
    {children}
  </Text>
);
