import React from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Button, ScrollView, Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { Input } from "@/components/form/Input";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});
type FormValues = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  return (
    <AuthPageGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text
            fontSize={24}
            fontWeight="bold"
            textAlign="center"
            marginBottom="$4"
          >
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
          <Button
            size="$7"
            height={50}
            onPress={() => {
              alert("Password reset instructions sent to your email");
            }}
          >
            <Text>Reset Password</Text>
          </Button>
          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href="/(auth)/login">
              <Text color="blue" textAlign="center">
                Back to login
              </Text>
            </Link>
          </YStack>
        </FormProvider>
      </PageContainer>
    </AuthPageGuard>
  );
}
