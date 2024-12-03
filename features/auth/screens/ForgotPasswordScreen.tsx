import React from "react";

import { useSendPasswordReset } from "@/features/auth/hooks/useSendPasswordReset";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useFirebaseErrorHandler } from "@/features/core/hooks/useFirebaseErrorHelper";

import { useToastController } from "@tamagui/toast";

import { H1, Paragraph, YStack } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  ForgotPasswordSchemaType,
  forgotPasswordSchema,
} from "../utils/schemas";

export default function ForgotPasswordScreen() {
  const { next } = useLocalSearchParams<{ next?: string }>();
  const toast = useToastController();
  const handleFirebaseError = useFirebaseErrorHandler();

  const router = useRouter();
  const methods = useForm<ForgotPasswordSchemaType>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      ...forgotPasswordSchema.getDefault(),
    },
    mode: "onTouched",
  });

  const { mutate, isPending } = useSendPasswordReset();

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    mutate(data.email, {
      onSuccess: () => {
        toast.show("Application Submitted", {
          message: "Password reset email sent! Please check your inbox.",
          variant: "success",
        });
        router.push({
          pathname: "/auth/forgot-password-success",
          params: { next },
        });
      },
      onError: (error) => {
        handleFirebaseError(error);
      },
    });
  };

  return (
    <PageContainer>
      <Form methods={methods}>
        <H1 fontWeight="bold" textAlign="center">
          Forgot Password
        </H1>

        <Input
          name="email"
          label="Email"
          placeholder="Enter your email"
          inputMode="email"
          autoCapitalize="none"
        />
        <ButtonCTA
          theme="accent"
          onPress={methods.handleSubmit(onSubmit)}
          isLoading={isPending}
          disabled={isPending}
        >
          Reset Password
        </ButtonCTA>

        <YStack alignItems="center" padding="$4" gap="$4">
          <Link href={`/auth/login?next=${next}`}>
            <Paragraph color="$accentColor" textAlign="center">
              Go back to login
            </Paragraph>
          </Link>
        </YStack>
      </Form>
    </PageContainer>
  );
}
