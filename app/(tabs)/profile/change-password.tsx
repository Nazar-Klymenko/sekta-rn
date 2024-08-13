import { useToastController } from "@tamagui/toast";

import React from "react";

import { useAuth } from "@/hooks/useAuth";
import { useChangePassword } from "@/hooks/useAuthOperations";
import { passwordSchema } from "@/utils/validationSchemas";

import { FormProvider, useForm } from "react-hook-form";
import { Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PasswordRequirements } from "@/components/form/PasswordRequirements";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

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
      }
    );
  };

  return (
    <AuthGuard>
      <PageContainer>
        <Form methods={methods}>
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
