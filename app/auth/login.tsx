import { Toast, useToastController } from "@tamagui/toast";

import React from "react";

import { useSignIn } from "@/hooks/useAuthOperations";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});
type FormValues = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const theme = useTheme();
  const signInMutation = useSignIn();
  const toast = useToastController();
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
            router.replace(returnTo as string);
          } else {
            router.replace("/");
          }
        },
        onError: (error) => {
          toast.show("Login failed", {
            message:
              error instanceof Error ? error.message : "An error occurred",
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <AuthPageGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text fontSize="$8" fontWeight="bold" textAlign="center">
            Log In
          </Text>
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
              <Text color="$accentColor" textAlign="center" fontSize="$3">
                Forgot password?
              </Text>
            </Link>
          </YStack>
          <PrimaryButton
            onPress={methods.handleSubmit(onSubmit)}
            text="Log in"
            isLoading={signInMutation.isPending}
            disabled={signInMutation.isPending}
          />
          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href={`/auth/username-bridge?returnTo=${returnTo}`}>
              <Text textAlign="center" fontSize="$3">
                Don't have an account?
                <Text color="$accentColor" fontSize="$3">
                  {" "}
                  Sign Up
                </Text>
              </Text>
            </Link>
          </YStack>
        </FormProvider>
      </PageContainer>
    </AuthPageGuard>
  );
}
