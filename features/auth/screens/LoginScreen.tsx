import React from "react";

import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthPageGuard } from "@/features/core/components/navigation/AuthPageGuard";
import { useFirebaseErrorHandler } from "@/features/core/hooks/useFirebaseErrorHelper";
import { emailSchema } from "@/utils/validationSchemas";

import { useToastController } from "@tamagui/toast";

import { H1, Paragraph, YStack, useTheme } from "tamagui";

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
  const theme = useTheme();
  const signInMutation = useSignIn();
  const toast = useToastController();
  const { returnTo } = useLocalSearchParams<{ returnTo: "/" }>();
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
    console.log(data);
    signInMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.show("Successfully logged in", {
            message: "Welcome back!",
            variant: "success",
          });
          if (returnTo) {
            router.replace({ pathname: returnTo });
          } else {
            router.replace("/");
          }
        },
        onError: (error) => {
          handleFirebaseError(error);
        },
      },
    );
  };

  return (
    <AuthPageGuard>
      <PageContainer formContainer>
        <Form methods={methods}>
          <H1 fontWeight="bold" textAlign="center">
            Log In
          </H1>
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
            <Link href={`/auth/forgot-password?returnTo=${returnTo}`}>
              <Paragraph color="$accentColor" textAlign="center" fontSize="$3">
                Forgot password?
              </Paragraph>
            </Link>
          </YStack>
          <PrimaryButton
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={signInMutation.isPending}
            disabled={signInMutation.isPending}
          >
            Log In
          </PrimaryButton>
          <YStack alignItems="center" padding="$4" gap="$4">
            <Link
              href={{
                pathname: "/auth/username-bridge",
                params: { returnTo },
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
    </AuthPageGuard>
  );
}
