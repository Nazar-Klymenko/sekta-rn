// src/screens/ResidentDetailsScreen.tsx
import React from "react";

import { Form } from "@/shared/components/form/Form";
import { Input } from "@/shared/components/form/Input";
import { FullPageLoading } from "@/shared/components/layout/FullPageLoading";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import { useResident } from "@/shared/hooks/useResidents";
import { ResidentData } from "@/shared/models/ResidentData";

import { useToastController } from "@tamagui/toast";

import { Button, Image, Text, XStack, YStack } from "tamagui";

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

export default function ResidentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: resident, isLoading, isError } = useResident(id);
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
  if (isError) return <Text>Error loading resident details</Text>;

  //   const onSubmit = (data: FormValues) => {
  //     updateResidentMutation.mutate(
  //       { id, ...data },
  //       {
  //         onSuccess: () => {
  //           toast.show("Resident updated successfully", {
  //             variant: "success",
  //           });
  //           router.back();
  //         },
  //         onError: (error) => {
  //           toast.show("Failed to update resident", {
  //             variant: "error",
  //           });
  //         },
  //       },
  //     );
  //   };

  return (
    <PageContainer scrollable>
      <Text>resident edit</Text>
      {/* <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <YStack space="$4">
          <Text fontSize="$6" fontWeight="bold">
            Edit Resident: {resident?.displayName}
          </Text>

          <Image
            source={{ uri: resident?.image.publicUrl }}
            width={200}
            height={200}
            borderRadius="$4"
          />

          <Input
            label="Display Name"
            name="displayName"
            placeholder="Enter display name"
          />

          <Input
            label="Email"
            name="email"
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Input
            label="Phone"
            name="phone"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <Text fontSize="$5" fontWeight="bold">
            Social Media
          </Text>
          <Input
            label="SoundCloud"
            name="socialMedia.soundcloud"
            placeholder="Enter SoundCloud URL"
          />
          <Input
            label="YouTube"
            name="socialMedia.youtube"
            placeholder="Enter YouTube URL"
          />
          <Input
            label="Instagram"
            name="socialMedia.instagram"
            placeholder="Enter Instagram handle"
          />
          <Input
            label="Facebook"
            name="socialMedia.facebook"
            placeholder="Enter Facebook URL"
          />

          <Input
            label="Genres"
            name="genres"
            placeholder="Enter genres (comma-separated)"
          />

          <Input
            label="Locations"
            name="locations"
            placeholder="Enter locations (comma-separated)"
          />

          <Input
            label="Additional Info"
            name="additionalInfo"
            placeholder="Enter additional information"
            multiline
            numberOfLines={4}
          />

          <XStack space="$4">
            <Button onPress={methods.handleSubmit(onSubmit)} theme="active">
              Save Changes
            </Button>
            <Button onPress={() => router.back()} theme="alt1">
              Cancel
            </Button>
          </XStack>
        </YStack>
      </Form> */}
    </PageContainer>
  );
}
