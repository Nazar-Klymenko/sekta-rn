import React from "react";

import { useSignUp } from "@/hooks/useAuthOperations";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Checkbox } from "@/components/form/Checkbox";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PasswordRequirements } from "@/components/form/PasswordRequirements";
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
  agreeTos: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
  agreeEmail: yup.boolean().optional(),
});

type FormValues = yup.InferType<typeof signUpSchema>;

export default function SignupScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { username = "" } = useLocalSearchParams<{ username: string }>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
    shouldFocusError: true,
    defaultValues: {
      username: username,
      email: "",
      password: "",
    },
  });
  const { handleSubmit, watch } = methods;

  const signUpMutation = useSignUp();

  const onSubmit = (data: FormValues) => {
    signUpMutation.mutate(
      {
        email: data.email,
        password: data.password,
        username: data.username,
        agreeTos: data.agreeTos,
        agreeEmail: data.agreeEmail || false,
      },
      {
        onSuccess: () => {
          router.replace("/(app)/(tabs)/(home)");
        },
        onError: () => {
          // alert("error");
        },
      }
    );
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
          </YStack>
          <PrimaryButton
            text="Sign up"
            onPress={handleSubmit(onSubmit)}
            isLoading={signUpMutation.isLoading}
            disabled={signUpMutation.isLoading}
          />
          <YStack>
            <Checkbox
              name="agreeEmail"
              id="agree-email"
              label="I want to subscribe to newsletter to receive email notifications about new events"
            />
            <Checkbox
              name="agreeTos"
              id="signup-agree-tos"
              label="I agree to Sekta Selekta's Terms of service and Privacy Policy*"
            />
          </YStack>

          {signUpMutation.isError && (
            <Text color="red" textAlign="center" marginTop="$2">
              {signUpMutation.error?.message ||
                "An error occurred during signup"}
            </Text>
          )}
          <YStack alignItems="center" padding="$4">
            <Link href="/auth/login">
              <Text textAlign="center">
                Already have an account?
                <Text color="$accentColor"> Log in</Text>
              </Text>
            </Link>
          </YStack>
        </Form>
      </PageContainer>
    </AuthPageGuard>
  );
}
