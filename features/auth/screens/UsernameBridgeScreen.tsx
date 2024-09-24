import { useQueryClient } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";

import { useUsernameAvailability } from "@/features/auth/hooks/useUsernameAvailability";
import { HelloWave } from "@/features/core/components/HelloWave";
import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthPageGuard } from "@/features/core/components/navigation/AuthPageGuard";
import { usernameSchema } from "@/utils/validationSchemas";

import { Info } from "@tamagui/lucide-icons";

import { Text, XStack, YStack } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const usernameBridgeSchema = yup.object().shape({
  username: usernameSchema,
});

type FormValues = yup.InferType<typeof usernameBridgeSchema>;

const TEMP_USERNAME_KEY = "temporaryUsername";

export default function UsernameBridgeScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { returnTo } = useLocalSearchParams<{
    returnTo?: string;
  }>();

  const methods = useForm<FormValues>({
      resolver: yupResolver(usernameBridgeSchema),
      shouldFocusError: true,
      defaultValues: {
        username:
          (queryClient.getQueryData([TEMP_USERNAME_KEY]) as string) || "",
      },
      mode: "onTouched",
    }),
    { handleSubmit, setValue, setError, watch } = methods;

  const username = watch("username");
  const {
    refetch: checkAvailability,
    data: isAvailable,
    isLoading,
    isError,
    error,
  } = useUsernameAvailability(username);

  useEffect(() => {
    return () => {
      queryClient.setQueryData([TEMP_USERNAME_KEY], username);
    };
  }, [username, queryClient]);

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await checkAvailability();
      if (result.data) {
        router.push({
          pathname: "/auth/signup",
          params: {
            username: data.username,
            returnTo: returnTo,
          },
        });
      } else {
        setError("username", { message: "Username is taken" });
      }
    } catch (err) {
      setError("username", { message: "Error checking username availability" });
    }
  };

  return (
    <AuthPageGuard>
      <PageContainer formContainer>
        <Form methods={methods}>
          <XStack justifyContent="center">
            <Text fontSize={40} fontWeight="bold" textAlign="center">
              Welcome!{"  "}
            </Text>
            <HelloWave />
          </XStack>
          <Text textAlign="center" color="$gray10Light">
            Choose a username. Don't worry, you can always change it later.
          </Text>
          <Input
            id="username"
            name="username"
            label="Username"
            placeholder="Username"
            autoCapitalize="none"
            inputMode="text"
            maxLength={20}
          />
          <XStack gap="$2">
            <Info color="$gray10Light" size={16} />
            <Text fontSize="$3" color="$gray10Light">
              Username must be 3-20 characters long and can contain letters,
              numbers, and underscores.
            </Text>
          </XStack>
          <PrimaryButton
            text="Continue"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <YStack alignItems="center" padding="$4" gap="$4">
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
