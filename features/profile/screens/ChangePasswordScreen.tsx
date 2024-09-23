import React from "react";

import { useChangePassword } from "@/features/profile/hooks/useChangePassword";
import { PrimaryButton } from "@/shared/components/buttons/PrimaryButton";
import { Form } from "@/shared/components/form/Form";
import { Input } from "@/shared/components/form/Input";
import { PasswordInput } from "@/shared/components/form/PasswordInput";
import { PasswordRequirements } from "@/shared/components/form/PasswordRequirements";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import { AuthGuard } from "@/shared/components/navigation/AuthGuard";
import { useAuth } from "@/shared/hooks/useAuth";
import { passwordSchema } from "@/utils/validationSchemas";

import { useToastController } from "@tamagui/toast";

import { Text, YStack, useTheme } from "tamagui";

import { FormProvider, useForm } from "react-hook-form";

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
  const toast = useToastController();
  const theme = useTheme();
  const changePasswordMutation = useChangePassword();
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
    changePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
          toast.show("Password changed successfully", {
            message: "Your password has been updated.",
            variant: "success",
          });
        },
        onError: (error) => {
          toast.show("Change password failed", {
            message:
              error instanceof Error ? error.message : "An error occurred",
            variant: "error",
          });
        },
      },
    );
  };

  return (
    <AuthGuard>
      <PageContainer formContainer>
        <Form methods={methods}>
          <Text fontSize={40} fontWeight="bold" textAlign="center">
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
            isLoading={changePasswordMutation.isPending}
            disabled={changePasswordMutation.isPending}
          />
          {changePasswordMutation.isError && (
            <Text>Error: {changePasswordMutation.error.message}</Text>
          )}
          {changePasswordMutation.isSuccess && (
            <Text>Password changed successfully</Text>
          )}
        </Form>
      </PageContainer>
    </AuthGuard>
  );
}