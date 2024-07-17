// src/screens/DeleteAccountScreen.tsx
import React, { useState } from "react";

import { useDeleteAccount } from "@/hooks/useAuthOperations";

import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  Paragraph,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { PasswordInput } from "@/components/form/PasswordInput";
import { AuthGuard } from "@/components/navigation/AuthGuard";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const deleteAccountSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required to delete your account"),
});

type FormValues = yup.InferType<typeof deleteAccountSchema>;

export default function DeleteAccountScreen() {
  const theme = useTheme();
  const router = useRouter();
  const deleteAccountMutation = useDeleteAccount();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const methods = useForm({
    resolver: yupResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setShowConfirmDialog(true);
  };

  const handleDeleteAccount = () => {
    const password = methods.getValues("password");
    deleteAccountMutation.mutate(password, {
      onSuccess: () => {
        router.replace("/(auth)/login");
      },
    });
  };

  return (
    <AuthGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Delete Account
          </Text>
          <Text textAlign="center" color="$red10">
            Warning: This action is irreversible. All your data will be
            permanently deleted.
          </Text>
          <PasswordInput
            id="delete-account-password"
            name="password"
            label="Confirm Password"
            placeholder="Enter your password"
            secureTextEntry
          />
          <PrimaryButton
            onPress={methods.handleSubmit(onSubmit)}
            text="Delete Account"
            isLoading={deleteAccountMutation.isLoading}
            disabled={deleteAccountMutation.isLoading}
            backgroundColor="$red10"
          />
          {deleteAccountMutation.isError && (
            <Text color="$red10">
              Error: {deleteAccountMutation.error.message}
            </Text>
          )}
        </FormProvider>

        <Dialog
          modal
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              animation="quick"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Dialog.Content
              key="content"
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
            >
              <Dialog.Title>Confirm Account Deletion</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Dialog.Description>
              <Paragraph size="$2" theme="alt2">
                All your data will be permanently deleted.
              </Paragraph>
              <XStack space="$3" justifyContent="flex-end">
                <Dialog.Close asChild>
                  <Button theme="alt1" aria-label="Close">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  theme="active"
                  onPress={handleDeleteAccount}
                  aria-label="Delete Account"
                >
                  Delete Account
                </Button>
              </XStack>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </PageContainer>
    </AuthGuard>
  );
}
