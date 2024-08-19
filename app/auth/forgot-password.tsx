import React from "react";

import { View } from "react-native";

import { useSendPasswordReset } from "@/hooks/useAuthOperations";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";
import { useToastController } from "@tamagui/toast";
import { useFirebaseErrorHandler } from "@/hooks/useFirebaseErrorHelper";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});
type FormValues = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const toast = useToastController();
  const handleFirebaseError = useFirebaseErrorHandler();

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
        toast.show("Application Submitted", {
          message: "Password reset email sent! Please check your inbox.",
          variant: "success",
        });
        router.push({
          pathname: "/auth/forgot-password-success",
          params: { returnTo },
        });
      },
      onError: (error) => {
        handleFirebaseError(error);
      },
    });
  };

  return (
    <AuthPageGuard>
      <PageContainer formContainer>
        <Form methods={methods}>
          <Text fontSize={40} fontWeight="bold" textAlign="center">
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
            isLoading={sendPasswordResetMutation.isPending}
            disabled={sendPasswordResetMutation.isPending}
          />

          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href={`/auth/login?returnTo=${returnTo}`}>
              <Text color="$accentColor" textAlign="center">
                Go back to login
              </Text>
            </Link>
          </YStack>
        </Form>
      </PageContainer>
    </AuthPageGuard>
  );
}
