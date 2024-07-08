import React, { useEffect } from "react";

import { useRouterPush } from "@/hooks/useRouterPush";

import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const usernameBridgeSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(18, "Username must be at most 18 characters")
    .trim(),
});

type FormValues = yup.InferType<typeof usernameBridgeSchema>;

export default function UsernameBridgeScreen() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(usernameBridgeSchema),
    shouldFocusError: true,
    defaultValues: {
      username: "",
    },
  });

  const { handleSubmit, setFocus, formState } = methods;
  const routerPushSignUp = useRouterPush("/(auth)/signup");

  const onSubmit = (data: FormValues) => {
    console.log(data);
    routerPushSignUp({
      next: "/",
      prev: "/(auth)/username-bridge",
      username: data.username,
    });
  };

  // useEffect(() => {
  //   if (formState.errors.username) {
  //     setTimeout(() => {
  //       setFocus("username");
  //     }, 100);
  //   }
  // }, [formState.errors, setFocus]);

  return (
    <AuthPageGuard>
      <PageContainer>
        <Form methods={methods}>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Welcome! 👋
          </Text>
          <Input
            id="username"
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <PrimaryButton text="Next" onPress={handleSubmit(onSubmit)} />
          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href="/(auth)/login">
              <Text textAlign="center">
                Already have an account? <Text color="blue">Log in</Text>
              </Text>
            </Link>
          </YStack>
        </Form>
      </PageContainer>
    </AuthPageGuard>
  );
}
