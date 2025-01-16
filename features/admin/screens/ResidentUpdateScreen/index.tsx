import React from "react";

import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { ImagePicker } from "@/features/core/components/form/ImagePicker";
import { Input } from "@/features/core/components/form/Input";
import { TextArea } from "@/features/core/components/form/TextArea";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useFetchResident } from "@/features/residents/hooks/useFetchResident";

import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateResident } from "../../hooks/useUpdateResident";
import { ResidentFormValues, residentSchema } from "../../utils/schemas";

export default function ResidentUpdateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: resident, isLoading } = useFetchResident(id);
  const { mutate, isPending } = useUpdateResident(id);
  const methods = useForm({
      resolver: yupResolver(residentSchema),
      defaultValues: {
        ...residentSchema.getDefault(),
        ...resident,
        image: { uri: resident?.image.publicUrl || "" },
        name: resident?.name.display,
      },
    }),
    { handleSubmit } = methods;

  const onSubmit = async (data: ResidentFormValues) => {
    if (!resident) return;

    mutate({
      residentId: id,
      originalData: resident,
      data,
    });
  };

  if (isLoading) return <FullPageLoading />;

  return (
    <PageContainer>
      <Form methods={methods}>
        <ImagePicker
          name="image"
          label="Resident Image"
          placeholder="Tap to select resident image"
        />
        <Input name="name" label="Name" placeholder="Name" />
        <TextArea
          name="bio"
          label="Resident bio"
          placeholder="Bio"
          rows={6}
          verticalAlign="top"
          maxLength={1000}
          multiline
        />

        <ButtonCTA
          theme="accent"
          disabled={isPending}
          isLoading={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          Next: Update Resident
        </ButtonCTA>
      </Form>
    </PageContainer>
  );
}
