import React from "react";

import { View } from "react-native";

import { useSendPasswordReset } from "@/hooks/useAuthOperations";

import { Link, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/form/Input";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});
type FormValues = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const methods = useForm<FormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendPasswordResetMutation = useSendPasswordReset();

  const onSubmit = async (data: FormValues) => {
    sendPasswordResetMutation.mutate(data.email, {
      onSuccess: () => {
        router.push("/auth/forgot-password-success");
      },
    });
  };

  return (
    <AuthPageGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text
            fontSize={24}
            fontWeight="bold"
            textAlign="center"
            marginBottom="$4"
          >
            Forgot Password
          </Text>

          <Input
            id="forgot-password-email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            inputMode="email"
            autoCapitalize="none"
          />
          <PrimaryButton
            text="Reset Password"
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={sendPasswordResetMutation.isLoading}
            disabled={sendPasswordResetMutation.isLoading}
          />
          {sendPasswordResetMutation.isError && (
            <Text color="red" textAlign="center" marginTop="$2">
              {sendPasswordResetMutation.error?.message || "An error occurred"}
            </Text>
          )}
          {sendPasswordResetMutation.isSuccess && (
            <Text color="green" textAlign="center" marginTop="$2">
              Password reset email sent. Please check your inbox.
            </Text>
          )}
          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href="/auth/login">
              <Text color="$accentColor" textAlign="center">
                Go back to login
              </Text>
            </Link>
          </YStack>
        </FormProvider>
      </PageContainer>
    </AuthPageGuard>
  );
}
