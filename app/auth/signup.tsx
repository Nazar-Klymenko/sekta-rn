import { useToastController } from "@tamagui/toast";

import React from "react";

import { useSignUp } from "@/hooks/useAuthOperations";
import { useFirebaseErrorHandler } from "@/hooks/useFirebaseErrorHelper";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/utils/validationSchemas";

import { Href, Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Checkbox } from "@/components/form/Checkbox";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PasswordRequirements } from "@/components/form/PasswordRequirements";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

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
      <PageContainer formContainer>
        <Form methods={methods} id="test">
          <Text fontSize={40} fontWeight="bold" textAlign="center">
            Sign Up
          </Text>
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
            text="Sign up"
            onPress={handleSubmit(onSubmit)}
            isLoading={signUpMutation.isPending}
            disabled={signUpMutation.isPending}
          />
          <YStack>
            <Checkbox name="agreeEmail" id="agree-email">
              <Text>
                I want to subscribe to newsletter to receive email notifications
                about new events
              </Text>
            </Checkbox>
            <Checkbox name="agreeTos" id="signup-agree-tos">
              <Text>
                I agree to Sekta Selekta's{" "}
                <Link href="/tos" push>
                  <Text color="$accentColor">Terms of service </Text>
                </Link>
                and
                <Link href="/privacy-policy" push>
                  <Text color="$accentColor"> Privacy Policy*</Text>
                </Link>
              </Text>
            </Checkbox>
          </YStack>

          {signUpMutation.isError && (
            <Text color="red" textAlign="center" marginTop="$2">
              {signUpMutation.error instanceof Error
                ? signUpMutation.error.message
                : "An error occurred during signup"}
            </Text>
          )}
          <YStack alignItems="center" padding="$4">
            <Link href={`/auth/login?returnTo=${returnTo}`}>
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
