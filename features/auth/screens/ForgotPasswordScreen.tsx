import React from "react";

import { useSendPasswordReset } from "@/features/auth/hooks/useSendPasswordReset";
import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthPageGuard } from "@/features/core/components/navigation/AuthPageGuard";
import { useFirebaseErrorHandler } from "@/features/core/hooks/useFirebaseErrorHelper";

import { useToastController } from "@tamagui/toast";

import { H1, Paragraph, YStack } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

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
    mode: "onTouched",
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
          <H1 fontWeight="bold" textAlign="center">
            Forgot Password
          </H1>

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
              <Paragraph color="$accentColor" textAlign="center">
                Go back to login
              </Paragraph>
            </Link>
          </YStack>
        </Form>
      </PageContainer>
    </AuthPageGuard>
  );
}
