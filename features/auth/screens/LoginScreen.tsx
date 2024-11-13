import React from "react";

import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useFirebaseErrorHandler } from "@/features/core/hooks/useFirebaseErrorHelper";
import { emailSchema } from "@/utils/validationSchemas";

import { useToastController } from "@tamagui/toast";

import { Paragraph, YStack } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required("Password is required"),
});
type FormValues = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const { mutate, isPending } = useSignIn();
  const toast = useToastController();
  const { next } = useLocalSearchParams<{ next: "/" }>();
  const router = useRouter();
  const handleFirebaseError = useFirebaseErrorHandler();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.show("Successfully logged in", {
            message: "Welcome back!",
            variant: "success",
          });
          if (next) {
            router.replace({ pathname: next });
          } else {
            router.replace("/");
          }
        },
        onError: (error) => {
          handleFirebaseError(error);
        },
      }
    );
  };

  return (
    <PageContainer>
      <Form methods={methods}>
        <Input
          id="login-email"
          name="email"
          label="Email"
          placeholder="Your email"
          inputMode="email"
          autoCapitalize="none"
        />
        <PasswordInput
          id="login-password"
          name="password"
          label="Password"
          placeholder="Your password"
          secureTextEntry
        />
        <YStack alignItems="center" padding="$4" gap="$4">
          <Link href={`/auth/forgot-password?next=${next}`}>
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
          <Link
            href={{
              pathname: "/auth/username-bridge",
              params: { next },
            }}
          >
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
