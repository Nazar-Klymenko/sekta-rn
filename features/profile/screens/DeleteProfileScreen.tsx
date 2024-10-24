import React, { useCallback, useState } from "react";

import { Keyboard, Pressable } from "react-native";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthGuard } from "@/features/core/components/navigation/AuthGuard";
import { Sheet } from "@/features/core/components/panels/Sheet";

import { UserRoundX } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import {
  Button,
  H1,
  Paragraph,
  Separator,
  Spinner,
  Theme,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useDeleteProfile } from "../hooks/useDeleteProfile";

const deleteProfileSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required to delete your account"),
});

type FormValues = yup.InferType<typeof deleteProfileSchema>;

export default function DeleteProfileScreen() {
  const theme = useTheme();
  const toast = useToastController();
  const { mutateAsync, isError } = useDeleteProfile();
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  let isPending = false;
  const formMethods = useForm({
    resolver: yupResolver(deleteProfileSchema),
    defaultValues: {
      password: "",
    },
    shouldFocusError: true,
    mode: "onTouched",
  });

  const handleSheetClose = useCallback(() => {
    Keyboard.dismiss();
    setShowConfirmSheet(false);
    formMethods.reset();
    formMethods.clearErrors();
  }, [formMethods]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      mutateAsync(data.password, {
        onSuccess: () => {
          toast.show("Account deleted", {
            message: "Your account has been successfully deleted.",
            variant: "success",
          });
          handleSheetClose();
        },
        onError: () => {
          formMethods.setError("password", {
            message: "Wrong password",
          });
        },
      });
    },
    [mutateAsync, toast, handleSheetClose, formMethods]
  );

  return (
    <AuthGuard>
      <PageContainer>
        <H1 fontWeight="bold" textAlign="center">
          Delete Account
        </H1>
        <Paragraph color="$gray10Light">
          Warning: All your data will be permanently deleted. This action cannot
          be undone.
        </Paragraph>

        <ButtonCTA
          aria-label="Start deleting profile"
          onPress={() => setShowConfirmSheet(true)}
          disabled={showConfirmSheet}
          flex={1}
        >
          Delete Account
        </ButtonCTA>

        <Sheet
          open={showConfirmSheet}
          onOpenChange={(isOpen: any) => {
            if (!isOpen) {
              handleSheetClose();
            }
          }}
        >
          <Pressable
            style={{ flex: 1, width: "100%" }}
            onPress={Keyboard.dismiss}
          >
            <YStack gap="$4" width="100%">
              <YStack gap="$4" alignItems="center">
                <UserRoundX size={48} color="$color" />
                <Paragraph size="$8" fontWeight={700}>
                  Delete Account
                </Paragraph>
                <Paragraph>
                  Warning: By pressing Delete all your data will be permanently
                  deleted. This action cannot be undone.
                </Paragraph>
                <Form methods={formMethods}>
                  <PasswordInput
                    id="password-delete-profile"
                    name="password"
                    label="Confirm Password"
                    placeholder="Enter your password"
                    secureTextEntry
                  />
                  <Separator />

                  <XStack flex={1} width="100%" gap="$4">
                    <ButtonCTA
                      theme={"surface1"}
                      aria-label="Close"
                      disabled={isPending}
                      onPress={handleSheetClose}
                      flex={1}
                    >
                      Cancel
                    </ButtonCTA>
                    <Theme name="danger">
                      <ButtonCTA
                        aria-label="Delte Profile"
                        isLoading={isPending}
                        disabled={isPending}
                        onPress={formMethods.handleSubmit(onSubmit)}
                        flex={1}
                      >
                        Delete
                      </ButtonCTA>
                    </Theme>
                  </XStack>
                </Form>
              </YStack>
            </YStack>
          </Pressable>
        </Sheet>
      </PageContainer>
    </AuthGuard>
  );
}
