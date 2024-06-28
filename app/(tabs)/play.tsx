import React, { useState } from "react";
import {
  YStack,
  XStack,
  Input,
  Button,
  Text,
  Label,
  Form,
  Separator,
} from "tamagui";
import {
  Mail,
  Phone,
  Music,
  Youtube,
  Instagram,
  Facebook,
} from "@tamagui/lucide-icons";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

interface PortfolioLinkProps {
  icon: any; // Adjust this type based on the icon component type you are using
  placeholder: string;
}

const PortfolioLink: React.FC<PortfolioLinkProps> = ({
  icon: Icon,
  placeholder,
}) => (
  <XStack alignItems="center" gap="$2" marginBottom="$2">
    <Icon size="$4" color="$gray10" />
    <Input flex={1} placeholder={placeholder} />
  </XStack>
);

export default function PlayScreen() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted", { email, phone });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack f={1} padding="$4" gap="$4">
          <YStack f={1} padding="$4" gap="$4">
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <YStack gap="$2" style={{ width: "100%" }}>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  style={{ width: "100%" }}
                />
              </YStack>

              <YStack gap="$2" style={{ width: "100%" }}>
                <XStack
                  alignItems="center"
                  gap="$0"
                  justifyContent="space-between"
                >
                  <Label htmlFor="phone">Phone Number</Label>
                  <Text fontSize="$2" color="$gray10">
                    Optional
                  </Text>
                </XStack>

                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={{ width: "100%" }}
                />
              </YStack>
              <YStack paddingVertical="$4" gap="$2" style={{ width: "100%" }}>
                <Text fontSize="$5" fontWeight="bold">
                  Portfolio Links (Optional)
                </Text>
                <PortfolioLink icon={Music} placeholder="SoundCloud URL" />
                <PortfolioLink icon={Youtube} placeholder="YouTube URL" />
                <PortfolioLink icon={Instagram} placeholder="Instagram URL" />
                <PortfolioLink icon={Facebook} placeholder="Facebook URL" />
              </YStack>
            </Form>
          </YStack>
          <YStack
            justifyContent="flex-end"
            marginTop="$4"
            style={{ width: "100%" }}
          >
            <Button
              size="$7"
              height="$6"
              theme="blue"
              onPress={handleSubmit}
              pressStyle={{ scale: 0.97 }}
              animation="quick"
              style={{ width: "100%" }}
            >
              <Text fontSize="$5" fontWeight="bold">
                Submit
              </Text>
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
