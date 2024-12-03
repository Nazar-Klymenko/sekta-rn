import React from "react";

import { useSendPasswordReset } from "@/features/auth/hooks/useSendPasswordReset";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { H1, SizableText, YStack } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});
type FormValues = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const { next } = useLocalSearchParams<{ next?: string }>();

  const router = useRouter();
  const methods = useForm<FormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const { mutate, isPending } = useSendPasswordReset();

  const onSubmit = async (data: FormValues) => {
    mutate(data.email, {
      onSuccess: () => {
        router.push({
          pathname: "/auth/forgot-password-success",
          params: { next },
        });
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
            <SizableText color="$accentColor" textAlign="center">
              Go back to login
            </SizableText>
          </Link>
        </YStack>
      </Form>
    </PageContainer>
  );
}
