import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { YStack, Text, Button, ScrollView, useTheme } from "tamagui";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/form/Input";
import { useNavigation } from "@react-navigation/native";
import { useRouterPush } from "@/hooks/useRouterPush";
import { Link } from "expo-router";

const usernameBridgeSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
});
type FormValues = yup.InferType<typeof usernameBridgeSchema>;

export default function UsernameBridgecreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const methods = useForm({
    resolver: yupResolver(usernameBridgeSchema),
    defaultValues: {
      username: "",
    },
  });
  const routerPushSignUp = useRouterPush("/(auth)/signup");
  const onSubmit = (data: FormValues) => {
    console.log(data);
    routerPushSignUp({
      next: "/",
      prev: "/(auth)/username-bridge",
      username: data.username,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.background.get() }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <FormProvider {...methods}>
              <YStack f={1} padding="$4" gap="$4">
                <Text fontSize={24} fontWeight="bold" textAlign="center">
                  Welcome! 👋
                </Text>
                <Input
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                />
                <View style={{ marginTop: 20 }}>
                  <Button
                    size="$7"
                    height={50}
                    pressStyle={{ scale: 0.97 }}
                    animation="quick"
                    onPress={methods.handleSubmit(onSubmit)}
                  >
                    <Text fontSize={20} fontWeight="bold">
                      Next
                    </Text>
                  </Button>
                </View>
                <YStack alignItems="center" padding="$4" gap="$4">
                  <Link href="/(auth)/login">
                    <Text textAlign="center">
                      Already have an account? <Text color="blue">Log in</Text>
                    </Text>
                  </Link>
                </YStack>
              </YStack>
            </FormProvider>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
