import React from "react";

import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { Checkbox } from "@/features/core/components/form/Checkbox";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PasswordRequirements } from "@/features/core/components/form/PasswordRequirements";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthPageGuard } from "@/features/core/components/navigation/AuthPageGuard";
import { useFirebaseErrorHandler } from "@/features/core/hooks/useFirebaseErrorHelper";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/utils/validationSchemas";

import { useToastController } from "@tamagui/toast";

import { H1, Paragraph, YStack, useTheme } from "tamagui";

import { Href, Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

export const signUpSchema = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
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
  const toast = useToastController();
  const handleFirebaseError = useFirebaseErrorHandler();
  const { username = "", returnTo = "/" } = useLocalSearchParams<{
    username: string;
    returnTo?: string;
  }>();

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
    signUpMutation.mutate(data, {
      onSuccess: () => {
        toast.show("Successfully signed up", {
          message: "Welcome!",
          variant: "success",
        });
        router.replace(returnTo);
      },
      onError: (error) => {
        handleFirebaseError(error);
      },
    });
  };

  return (
    <AuthPageGuard>
      <PageContainer>
        <Form methods={methods} id="test">
          <H1 fontWeight="bold" textAlign="center">
            Sign Up
          </H1>
          <Input
            id="signup-email"
            name="email"
            label="Email"
            placeholder="Your email"
            inputMode="email"
            autoCapitalize="none"
          />
          <YStack gap="$0">
            <PasswordInput
              id="signup-password"
              name="password"
              label="Password"
              placeholder="New password"
              secureTextEntry
            />
            <PasswordRequirements password={watch("password")} />
          </YStack>
          <PrimaryButton
            onPress={handleSubmit(onSubmit)}
            isLoading={signUpMutation.isPending}
            disabled={signUpMutation.isPending}
          >
            Sign up
          </PrimaryButton>
          <YStack>
            <Checkbox name="agreeEmail" id="agree-email">
              <Paragraph>
                I want to subscribe to newsletter to receive email notifications
                about new events
              </Paragraph>
            </Checkbox>
            <Checkbox name="agreeTos" id="signup-agree-tos">
              <Paragraph>
                I agree to Sekta Selekta's{" "}
                <Link href="/tos" push>
                  <Paragraph color="$accentColor">Terms of service </Paragraph>
                </Link>
                and
                <Link href="/privacy-policy" push>
                  <Paragraph color="$accentColor"> Privacy Policy*</Paragraph>
                </Link>
              </Paragraph>
            </Checkbox>
          </YStack>

          {signUpMutation.isError && (
            <Paragraph color="red" textAlign="center" marginTop="$2">
              {signUpMutation.error instanceof Error
                ? signUpMutation.error.message
                : "An error occurred during signup"}
            </Paragraph>
          )}
          <YStack alignItems="center" padding="$4">
            <Link href={`/auth/login?returnTo=${returnTo}`}>
              <Paragraph textAlign="center">
                Already have an account?
                <Paragraph color="$accentColor"> Log in</Paragraph>
              </Paragraph>
            </Link>
          </YStack>
        </Form>
      </PageContainer>
    </AuthPageGuard>
  );
}
