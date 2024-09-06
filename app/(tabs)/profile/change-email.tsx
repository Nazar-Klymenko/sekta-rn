// src/screens/UpdateEmailScreen.tsx
import { useToastController } from "@tamagui/toast";

import React, { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useUpdateEmail } from "@/hooks/useAuthOperations";
import { emailSchema } from "@/utils/validationSchemas";

import { useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

const updateEmailSchema = yup.object().shape({
  newEmail: emailSchema,
  currentPassword: yup.string().required("Current password is required"),
});

type FormValues = yup.InferType<typeof updateEmailSchema>;

export default function UpdateEmailScreen() {
  const { user } = useAuth();
  const updateEmailMutation = useUpdateEmail();
  const toast = useToastController();
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(updateEmailSchema),
    defaultValues: {
      newEmail: "",
      currentPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    updateEmailMutation.mutate(
      {
        profileData: { email: data.newEmail },
        currentPassword: data.currentPassword,
      },
      {
        onSuccess: (response) => {
          setIsVerificationSent(true);
          toast.show("Verification Email Sent", {
            message: response.message,
            variant: "success",
          });
          methods.reset();
        },
        onError: (error) => {
          toast.show("Email update failed", {
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
            Change your email
          </Text>
          <Text color="$gray10Light">
            You will have to confirm you new email in your inbox before it will
            change. You will be logged out and will have to login again.
          </Text>
          <Text fontSize="$4" color="$gray10Light">
            Current email: <Text color={"$color"}>{user?.email}</Text>
          </Text>
          <Input
            id="new-email"
            name="newEmail"
            label="New Email"
            placeholder="Enter your new email"
            inputMode="email"
            autoCapitalize="none"
          />
          <PasswordInput
            id="current-password"
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            secureTextEntry
          />
          <PrimaryButton
            onPress={methods.handleSubmit(onSubmit)}
            text="Update Email"
            isLoading={updateEmailMutation.isPending}
            disabled={updateEmailMutation.isPending || isVerificationSent}
          />
          {isVerificationSent && (
            <YStack marginTop="$4">
              <Text textAlign="center" color="$green10">
                Verification email sent. Please check your new email inbox and
                verify before logging in again.
              </Text>
            </YStack>
          )}
        </Form>
      </PageContainer>
    </AuthGuard>
  );
}
