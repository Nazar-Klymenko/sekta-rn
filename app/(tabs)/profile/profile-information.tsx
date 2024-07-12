import React from "react";

import { useAuth } from "@/hooks/useAuth";
import { useChangePassword } from "@/hooks/useAuthOperations";

import { FormProvider, useForm } from "react-hook-form";
import { Text, XStack, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/form/Input";
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
  const { user, isLoggedIn } = useAuth();

  const methods = useForm({
      resolver: yupResolver(changePasswordSchema),
      defaultValues: {
        currentPassword: "",
      },
    }),
    { watch, reset, handleSubmit } = methods;

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <AuthGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Change Profile Information
          </Text>
          <Input
            id="change-email"
            name="changeEmail"
            label="Current email"
            placeholder="Current email"
          />
          <Input
            id="change-username"
            name="changeUsername"
            label="Username"
            placeholder="Username"
          />
          <Input
            id="full-name"
            name="fullName"
            label="Full Name"
            placeholder="Full name"
          />
          <XStack
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Verify email</Text>
            <PrimaryButton
              disabled={user?.emailVerified}
              text={user?.emailVerified ? "Verified" : "Verify"}
            />
          </XStack>
        </FormProvider>
      </PageContainer>
    </AuthGuard>
  );
}
