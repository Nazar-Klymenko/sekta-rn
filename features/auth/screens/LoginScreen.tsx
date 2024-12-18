import React from "react";

import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Paragraph, YStack } from "tamagui";

import { Link } from "expo-router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { LoginSchemaType, loginSchema } from "../utils/schemas";

export default function LoginScreen() {
  const { mutate, isPending } = useSignIn();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      ...loginSchema.getDefault(),
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchemaType) => {
    mutate(data);
  };

  return (
    <PageContainer>
      <Form methods={methods}>
        <Input
          name="email"
          label="Email"
          placeholder="Your email"
          inputMode="email"
          autoCapitalize="none"
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
        />
        <YStack alignItems="center" padding="$4" gap="$4">
          <Link href={`/auth/forgot-password`}>
            <Paragraph color="$accentColor" textAlign="center" fontSize="$3">
              Forgot password?
            </Paragraph>
          </Link>
        </YStack>
        <ButtonCTA
          theme="accent"
          onPress={methods.handleSubmit(onSubmit)}
          isLoading={isPending}
          disabled={isPending}
        >
          Log in
        </ButtonCTA>
        <YStack alignItems="center" padding="$4" gap="$4">
          <Link href={"/auth/username-bridge"}>
            <Paragraph textAlign="center" fontSize="$3">
              Don't have an account?
              <Paragraph color="$accentColor" fontSize="$3">
                {" "}
                Sign Up
              </Paragraph>
            </Paragraph>
          </Link>
        </YStack>
      </Form>
    </PageContainer>
  );
}
