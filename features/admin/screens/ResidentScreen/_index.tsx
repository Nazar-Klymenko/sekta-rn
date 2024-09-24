import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useResidents } from "@/features/residents/hooks/useResidents";

import { useToastController } from "@tamagui/toast";

import { SizableText } from "tamagui";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const residentSchema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  email: yup.string().email("Invalid email"),
  phone: yup.string(),
  socialMedia: yup.object().shape({
    soundcloud: yup.string().url("Invalid URL"),
    youtube: yup.string().url("Invalid URL"),
    instagram: yup.string(),
    facebook: yup.string().url("Invalid URL"),
  }),
  genres: yup.array().of(yup.string()),
  locations: yup.array().of(yup.string()),
  additionalInfo: yup.string(),
});

type FormValues = yup.InferType<typeof residentSchema>;

export default function ResidentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: resident, isLoading, isError } = useResidents(id);
  //   const updateResidentMutation = useUpdateResident();
  const router = useRouter();
  const toast = useToastController();

  const methods = useForm<FormValues>({
    resolver: yupResolver(residentSchema),
    defaultValues: resident || {},
  });

  React.useEffect(() => {
    if (resident) {
      methods.reset(resident);
    }
  }, [resident]);

  if (isLoading) return <FullPageLoading />;
  if (isError) return <SizableText>Error loading resident details</SizableText>;

  return (
    <PageContainer scrollable>
      <SizableText>resident edit</SizableText>
    </PageContainer>
  );
}
