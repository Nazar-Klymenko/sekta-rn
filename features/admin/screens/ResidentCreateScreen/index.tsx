import React from "react";

import { useForm } from "react-hook-form";

import {
  ResidentFormValues,
  residentSchema,
} from "@/features/admin/utils/schemas";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { ImagePicker } from "@/features/core/components/form/ImagePicker";
import { Input } from "@/features/core/components/form/Input";
import { TextArea } from "@/features/core/components/form/TextArea";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateResident } from "../../hooks/useCreateResident";

export default function ResidentCreateScreen() {
  const methods = useForm({
    resolver: yupResolver(residentSchema),
    defaultValues: { ...residentSchema.getDefault() },
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useCreateResident();

  const onSubmit = (data: ResidentFormValues) => {
    mutate({ data });
  };

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
          Next: Publish Resident
        </ButtonCTA>
      </Form>
    </PageContainer>
  );
}
