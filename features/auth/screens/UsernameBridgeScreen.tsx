import React, { useEffect, useState } from "react";

import { useUsername } from "@/features/auth/context/UsernameContext";
import { isUsernameAvailable } from "@/features/auth/utils/isUsernameAvailable";
import { Hint } from "@/features/core/components/Hint";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { SizableText, YStack } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  UsernameBridgeSchemaType,
  usernameBridgeSchema,
} from "../utils/schemas";

export default function UsernameBridgeScreen() {
  const router = useRouter();
  const { next } = useLocalSearchParams<{ next?: string }>();
  const { tempUsername, setTempUsername } = useUsername();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<UsernameBridgeSchemaType>({
    resolver: yupResolver(usernameBridgeSchema),
    shouldFocusError: true,
    defaultValues: {
      ...usernameBridgeSchema.getDefault(),
      username: tempUsername,
    },
    mode: "onTouched",
  });

  const { handleSubmit, setError, watch } = methods;
  const username = watch("username");

  useEffect(() => {
    setTempUsername(username);
  }, [username]);

  const onSubmit = async (data: UsernameBridgeSchemaType) => {
    try {
      setIsLoading(true);
      const usernameAvailable = true;

      if (usernameAvailable) {
        router.push("/auth/signup");
      } else {
        setError("username", { message: "Username is taken" });
      }
    } catch (err) {
      setError("username", { message: "Error checking username availability" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Form methods={methods}>
        <Input
          name="username"
          label="Username"
          placeholder="Username"
          autoCapitalize="none"
          inputMode="text"
          maxLength={20}
        />

        <Hint>
          Username must be 3-20 characters long and can contain letters,
          numbers, and underscores.
        </Hint>

        <ButtonCTA
          theme="accent"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Continue: Email
        </ButtonCTA>

        <YStack alignItems="center" padding="$4" gap="$4">
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
