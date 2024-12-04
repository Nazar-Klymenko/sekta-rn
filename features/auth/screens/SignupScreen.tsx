import React from "react";

import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Checkbox } from "@/features/core/components/form/Checkbox";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PasswordRequirements } from "@/features/core/components/form/PasswordRequirements";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/utils/validationSchemas";

import { H1, Paragraph, YStack } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
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
  const router = useRouter();
  const { username = "" } = useLocalSearchParams<{
    username: string;
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
  const { mutate, isPending } = useSignUp();

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("../");
      },
    });
  };

  return (
    <PageContainer>
      <Form methods={methods}>
        <H1 fontWeight="bold" textAlign="center">
          Sign Up
        </H1>
        <Input
          name="email"
          label="Email"
          placeholder="Your email"
          inputMode="email"
          autoCapitalize="none"
        />
        <YStack gap="$0">
          <PasswordInput
            name="password"
            label="Password"
            placeholder="New password"
            secureTextEntry
          />
          <PasswordRequirements password={watch("password")} />
        </YStack>

        <ButtonCTA
          theme="accent"
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
          disabled={isPending}
        >
          Sign up
        </ButtonCTA>
        <YStack>
          <Checkbox name="agreeEmail">
            <Paragraph>
              I want to subscribe to newsletter to receive email notifications
              about new events
            </Paragraph>
          </Checkbox>
          <Checkbox name="agreeTos">
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

        <YStack alignItems="center" padding="$4">
          <Link href={`/auth/login`}>
            <Paragraph textAlign="center">
              Already have an account?
              <Paragraph color="$accentColor"> Log in</Paragraph>
            </Paragraph>
          </Link>
        </YStack>
      </Form>
    </PageContainer>
  );
}
