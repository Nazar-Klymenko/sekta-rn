import React from "react";

import { useAuth } from "@/hooks/useAuth";
import { useChangePassword } from "@/hooks/useAuthOperations";

import { FormProvider, useForm } from "react-hook-form";
import { Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PasswordRequirements } from "@/components/form/PasswordRequirements";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});
type FormValues = yup.InferType<typeof changePasswordSchema>;

export default function ChangePasswordScreen() {
  const theme = useTheme();
  const changePasswordMutation = useChangePassword();
  const methods = useForm({
      resolver: yupResolver(changePasswordSchema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }),
    { watch, reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    changePasswordMutation.mutate(
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
    <AuthGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Change Password
          </Text>
          <PasswordInput
            id="current-password"
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            secureTextEntry
          />
          <PasswordInput
            id="new-password"
            name="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            secureTextEntry
          />
          <PasswordRequirements password={watch("newPassword")} />
          <PasswordInput
            id="confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            secureTextEntry
          />
          <PrimaryButton
            onPress={handleSubmit(onSubmit)}
            text="Change Password"
            isLoading={changePasswordMutation.isLoading}
            disabled={changePasswordMutation.isLoading}
          />
          {changePasswordMutation.isError && (
            <Text>Error: {changePasswordMutation.error.message}</Text>
          )}
          {changePasswordMutation.isSuccess && (
            <Text>Password changed successfully</Text>
          )}
        </FormProvider>
      </PageContainer>
    </AuthGuard>
  );
}
