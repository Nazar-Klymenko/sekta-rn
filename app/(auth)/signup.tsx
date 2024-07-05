import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { YStack, Text, Button, ScrollView, useTheme } from "tamagui";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/form/Input";
import { Link, useLocalSearchParams } from "expo-router";
import { PasswordStrengthIndicator } from "@/components/form/PasswordStrengthIndicator";
import { PasswordInput } from "@/components/form/PasswordInput";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";
const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
type FormValues = yup.InferType<typeof signUpSchema>;

export default function SignupScreen() {
  const theme = useTheme();
  const { username = "" } = useLocalSearchParams<{ username: string }>();

  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: username,
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle signup logic here
  };

  return (
    <AuthPageGuard>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background.get() }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <FormProvider {...methods}>
          <YStack f={1} padding="$4" gap="$4">
            <Text fontSize={24} fontWeight="bold" textAlign="center">
              Sign Up
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
            <PasswordStrengthIndicator password={methods.watch("password")} />

            <Button
              size="$7"
              height={50}
              pressStyle={{ scale: 0.97 }}
              animation="quick"
              onPress={methods.handleSubmit(onSubmit)}
            >
              <Text fontSize={20} fontWeight="bold">
                Sign Up
              </Text>
            </Button>
            <YStack alignItems="center" padding="$4" gap="$4">
              <Link href="/(auth)/login">
                <Text textAlign="center">
                  Already have an account? <Text color="blue">Log in</Text>
                </Text>
              </Link>
            </YStack>
          </YStack>
        </FormProvider>
      </ScrollView>
    </AuthPageGuard>
  );
}
