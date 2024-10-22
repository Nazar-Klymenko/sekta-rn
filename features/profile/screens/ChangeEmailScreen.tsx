import React, { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthGuard } from "@/features/core/components/navigation/AuthGuard";
import { useChangeEmail } from "@/features/profile/hooks/useChangeEmail";
import { emailSchema } from "@/utils/validationSchemas";

import { useToastController } from "@tamagui/toast";

import { H1, Paragraph, YStack } from "tamagui";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const updateEmailSchema = yup.object().shape({
  newEmail: emailSchema,
  currentPassword: yup.string().required("Current password is required"),
});

type FormValues = yup.InferType<typeof updateEmailSchema>;

export default function ChangeEmailScreen() {
  const { user } = useAuth();
  const { isPending, isError, mutate } = useChangeEmail();
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
    mutate(
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
      }
    );
  };

  return (
    <AuthGuard>
      <PageContainer>
        <Form methods={methods}>
          <H1 fontWeight="bold" textAlign="center">
            Change your email
          </H1>
          <Paragraph color="$gray10Light">
            You will have to confirm you new email in your inbox before it will
            change. You will be logged out and will have to login again.
          </Paragraph>
          <Paragraph fontSize="$4" color="$gray10Light">
            Current email: <Paragraph color={"$color"}>{user?.email}</Paragraph>
          </Paragraph>
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
            isLoading={isPending}
            disabled={isPending || isVerificationSent}
          />
          {isVerificationSent && (
            <YStack marginTop="$4">
              <Paragraph textAlign="center" color="$green10">
                Verification email sent. Please check your new email inbox and
                verify before logging in again.
              </Paragraph>
            </YStack>
          )}
        </Form>
      </PageContainer>
    </AuthGuard>
  );
}
