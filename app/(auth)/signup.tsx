import React from "react";

import { Link, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PasswordRequirements } from "@/components/form/PasswordRequirements";
import { PasswordStrengthIndicator } from "@/components/form/PasswordStrengthIndicator";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .trim(),
  password: yup
    .string()
    .required(" ")
    .min(6, " ")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/,
      " "
    )
    .trim(),
});

type FormValues = yup.InferType<typeof signUpSchema>;

export default function SignupScreen() {
  const theme = useTheme();
  const { username = "" } = useLocalSearchParams<{ username: string }>();

  const methods = useForm<FormValues>({
      resolver: yupResolver(signUpSchema),
      shouldFocusError: true,
      defaultValues: {
        username: username,
        email: "",
        password: "",
      },
    }),
    { handleSubmit, watch } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:");
    console.log("Form submitted:", data);
    // Handle signup logic here
  };

  return (
    <AuthPageGuard>
      <PageContainer>
        <Form methods={methods} id="test">
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Sign Up
          </Text>

          <Input
            id="signup-email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            inputMode="email"
            autoCapitalize="none"
          />

          <YStack gap="$0">
            <PasswordInput
              id="signup-password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
            />
            <PasswordRequirements password={watch("password")} />
            {/* <PasswordStrengthIndicator password={watch("password")} /> */}
          </YStack>
          <PrimaryButton text="Sign up" onPress={handleSubmit(onSubmit)} />

          <YStack alignItems="center" padding="$4">
            <Link href="/(auth)/login">
              <Text textAlign="center">
                Already have an account? <Text>Log in</Text>
              </Text>
            </Link>
          </YStack>
        </Form>
      </PageContainer>
    </AuthPageGuard>
  );
}
