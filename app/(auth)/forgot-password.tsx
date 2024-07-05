import React from "react";
import { ScrollView, Text, useTheme, Button, YStack } from "tamagui";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { Input } from "@/components/form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});
type FormValues = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.background.get() }}
    >
      <ScrollView>
        <FormProvider {...methods}>
          <YStack f={1} padding="$4" gap="$4">
            <Text
              fontSize={24}
              fontWeight="bold"
              textAlign="center"
              marginBottom="$4"
            >
              Forgot Password
            </Text>

            <Input
              name="email"
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Button
              size="$7"
              height={50}
              onPress={() => {
                alert("Password reset instructions sent to your email");
              }}
            >
              <Text>Reset Password</Text>
            </Button>
            <YStack alignItems="center" padding="$4" gap="$4">
              <Link href="/(auth)/login">
                <Text color="blue" textAlign="center">
                  Back to login
                </Text>
              </Link>
            </YStack>
          </YStack>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
