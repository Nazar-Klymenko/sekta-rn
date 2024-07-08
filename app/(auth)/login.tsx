import React from "react";

import { ScrollView } from "react-native";

import { signIn } from "@/services/auth";

import { Link } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});
type FormValues = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    await signIn(data.email, data.password);
    // Handle login logic here
  };

  return (
    <AuthPageGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Log In
          </Text>

          <Input
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />
          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href="/(auth)/forgot-password">
              <Text color="blue" textAlign="center">
                Forgot password?
              </Text>
            </Link>
          </YStack>
          <Button
            size="$7"
            height={50}
            pressStyle={{ scale: 0.97 }}
            animation="quick"
            onPress={methods.handleSubmit(onSubmit)}
          >
            <Text fontSize={20} fontWeight="bold">
              Log In
            </Text>
          </Button>

          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href="/(auth)/signup">
              <Text textAlign="center">
                Don't have an account?
                <Text color="blue" textDecorationLine="underline">
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
