import React from "react";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PasswordRequirements } from "@/features/core/components/form/PasswordRequirements";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useChangePassword } from "@/features/profile/hooks/useChangePassword";
import { passwordSchema } from "@/utils/validationSchemas";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});
type FormValues = yup.InferType<typeof changePasswordSchema>;

export default function ChangePasswordScreen() {
  const { mutate, isPending } = useChangePassword();
  const methods = useForm({
      resolver: yupResolver(changePasswordSchema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      mode: "onTouched",
    }),
    { watch, reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValues) => {
    mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <PageContainer>
      <Form methods={methods}>
        <PasswordInput
          name="currentPassword"
          label="Current Password"
          placeholder="Enter your current password"
          secureTextEntry
        />
        <PasswordInput
          name="newPassword"
          label="New Password"
          placeholder="Enter your new password"
          secureTextEntry
        />
        <PasswordRequirements password={watch("newPassword")} />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your new password"
          secureTextEntry
        />

        <ButtonCTA
          theme="accent"
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
          disabled={isPending}
        >
          Change Password
        </ButtonCTA>
      </Form>
    </PageContainer>
  );
}
