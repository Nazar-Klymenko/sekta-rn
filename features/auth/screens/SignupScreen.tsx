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
import { useFirebaseErrorHandler } from "@/features/core/hooks/useFirebaseErrorHelper";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/utils/validationSchemas";

import { useToastController } from "@tamagui/toast";

import { SizableText, YStack } from "tamagui";

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
  const toast = useToastController();
  const { tempUsername } = useUsername();
  const handleFirebaseError = useFirebaseErrorHandler();
  const { next = "/" } = useLocalSearchParams<{
    username: string;
    next: "/";
  }>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
    shouldFocusError: true,
    defaultValues: {
      username: tempUsername,
      email: "",
      password: "",
    },
  });
  const { handleSubmit, watch } = methods;
  const { mutate, isPending } = useSignUp();

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.show("Successfully signed up", {
          message: "Welcome!",
          variant: "success",
        });
        if (next) {
          router.replace({ pathname: next });
        } else {
          router.replace("/");
        }
      },
      onError: (error) => {
        handleFirebaseError(error);
      },
    });
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
          <Link href={`/auth/login?next=${next}`}>
            <SizableText textAlign="center">
              Already have an account?
              <SizableText color="$accentColor"> Log in</SizableText>
            </SizableText>
          </Link>
        </YStack>
      </Form>
    </PageContainer>
  );
}
