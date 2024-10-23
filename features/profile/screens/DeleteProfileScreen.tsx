import React, { useCallback, useState } from "react";

import { Keyboard, Pressable } from "react-native";

import { Dialog } from "@/features/core/components/Dialog";
import { SecondaryButton } from "@/features/core/components/buttons/SecondaryButton";
import { Form } from "@/features/core/components/form/Form";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthGuard } from "@/features/core/components/navigation/AuthGuard";

import { LoaderCircle, UserRoundX, X } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import {
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
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
  const { mutateAsync, isPending, isError } = useDeleteProfile();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
    setShowConfirmDialog(false);
    formMethods.reset();
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

  console.log({ isPending });
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

        <SecondaryButton
          text="Delete Account"
          onPress={() => setShowConfirmDialog(true)}
        />

        <Sheet
          animation="medium"
          modal
          snapPointsMode="fit"
          dismissOnSnapToBottom
          open={showConfirmDialog}
          onOpenChange={(isOpen: any) => {
            if (!isOpen) {
              handleSheetClose();
            }
          }}
          zIndex={1000008}
          dismissOnOverlayPress
        >
          <Sheet.Overlay
            animation="medium"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Handle />
          <Sheet.Frame
            flex={1}
            justifyContent="center"
            alignItems="center"
            gap="$5"
            padding="$4"
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
                    By pressing delete, the event will be deleted permanently.
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

                    <Theme name={"surface1"}>
                      <XStack flex={1} width="100%" gap="$4">
                        <Button
                          disabled={isPending}
                          aria-label="Close"
                          size={"$6"}
                          onPress={handleSheetClose}
                          flex={1}
                          backgroundColor={"$background"}
                          pressStyle={{
                            borderWidth: 0,
                            backgroundColor: "$background",
                            opacity: 0.7,
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={isPending}
                          aria-label="Delete Account"
                          size={"$6"}
                          onPress={formMethods.handleSubmit(onSubmit)}
                          flex={1}
                          backgroundColor={"$red10Light"}
                          pressStyle={{
                            borderWidth: 0,
                            backgroundColor: "$background",
                            opacity: 0.7,
                          }}
                        >
                          {isPending && <Spinner color="$color" />}
                          Delete
                        </Button>
                      </XStack>
                    </Theme>
                  </Form>
                </YStack>
              </YStack>
            </Pressable>
          </Sheet.Frame>
        </Sheet>
      </PageContainer>
    </AuthGuard>
  );
}
