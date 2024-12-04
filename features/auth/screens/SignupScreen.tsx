import React from "react";

import { useUsername } from "@/features/auth/context/UsernameContext";
import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Checkbox } from "@/features/core/components/form/Checkbox";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PasswordRequirements } from "@/features/core/components/form/PasswordRequirements";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { SizableText, YStack } from "tamagui";

import { Link } from "expo-router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { SignUpSchemaType, signUpSchema } from "../utils/schemas";

export default function SignupScreen() {
  const { mutate, isPending } = useSignUp();
  const { tempUsername } = useUsername();

  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      ...signUpSchema.getDefault(),
      username: tempUsername,
    },
    shouldFocusError: true,
  });
  const { handleSubmit, watch } = methods;

  const onSubmit = (data: SignUpSchemaType) => {
    mutate(data);
  };

  return (
    <PageContainer>
      <Form methods={methods}>
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

        <YStack>
          <Checkbox name="agreeTos">
            <SizableText>
              I agree to Sekta Selekta's
              <Link href="/tos" push>
                <SizableText color="$accentColor">
                  {" "}
                  Terms of service{" "}
                </SizableText>
              </Link>
              and
              <Link href="/privacy-policy" push>
                <SizableText color="$accentColor"> Privacy Policy</SizableText>
              </Link>
            </SizableText>
          </Checkbox>
          <Checkbox name="agreeEmail">
            <SizableText>
              I want to subscribe to newsletter to receive email notifications
              about new events
            </SizableText>
          </Checkbox>
        </YStack>

        <ButtonCTA
          theme="accent"
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
          disabled={isPending}
        >
          Sign up
        </ButtonCTA>

        <YStack alignItems="center" padding="$4">
          <Link href={`/auth/login`}>
            <SizableText>
              Already have an account?
              <SizableText color="$accentColor"> Log in</SizableText>
            </SizableText>
          </Link>
        </YStack>
      </Form>
    </PageContainer>
  );
}
