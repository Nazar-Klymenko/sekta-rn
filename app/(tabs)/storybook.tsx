import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { YStack, Text, Button, Spinner, ScrollView, useTheme } from "tamagui";
import {
  Mail,
  Phone,
  Music2,
  Youtube,
  Instagram,
  Facebook,
  Calendar,
} from "@tamagui/lucide-icons";
import { PortfolioLinkInput } from "@/components/form/PortfolioLinkInput";
import { Input } from "@/components/form/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const portfolioLinks = [
  {
    name: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "username",
    prefix: true,
  },
  {
    name: "soundcloud",
    label: "Soundcloud",
    icon: Music2,
    placeholder: "https://soundcloud.com/",
  },
];
const playSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  date: z.date(),
  soundcloud: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

type FormValues = z.infer<typeof playSchema>;

export default function StorybookScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const methods = useForm<FormValues>({
    resolver: zodResolver(playSchema),
    defaultValues: {
      email: "",
      phone: "",
      date: new Date(),
      soundcloud: "",
      youtube: "",
      instagram: "",
      facebook: "",
    },
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get(),
      }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background.get() }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <FormProvider {...methods}>
          <YStack f={1} padding="$4" gap="$4">
            <Text fontSize={24} fontWeight="bold" textAlign="center">
              Let's Play! 🎵
            </Text>
            <Text fontSize={20} fontWeight="bold">
              Portfolio Links (Optional)
            </Text>
            <Input
              name="email"
              label="Contact Email"
              placeholder="email@gmail.com"
            />
            <Input
              name="phone"
              label="Phone Number (Optional)"
              placeholder="577 925 024"
            />

            <Text fontSize={20} fontWeight="bold">
              Portfolio Inputs
            </Text>
            {portfolioLinks.map(
              ({ name, icon, placeholder, prefix, label }) => (
                <PortfolioLinkInput
                  key={name}
                  name={name}
                  label={label}
                  icon={icon}
                  placeholder={placeholder}
                  prefix={prefix}
                />
              )
            )}
            <Text fontSize={20} fontWeight="bold">
              Buttons
            </Text>
            <Button
              size="$7"
              height={50}
              pressStyle={{ scale: 0.97 }}
              animation="quick"
              onPress={() => {}}
              icon={<Spinner />}
            >
              <Text fontSize={20} fontWeight="bold">
                Let's Rock! 🎸
              </Text>
            </Button>
            <Button
              size="$7"
              height={50}
              pressStyle={{ scale: 0.97 }}
              animation="quick"
              onPress={() => {
                setIsLoading((s) => !s);
              }}
              icon={isLoading ? <Spinner /> : undefined}
            >
              <Text fontSize={20} fontWeight="bold">
                Let's Rock! 🎸
              </Text>
            </Button>
            <Button
              size="$7"
              height={50}
              pressStyle={{ scale: 0.97 }}
              animation="quick"
              onPress={() => {}}
              disabled={true}
              icon={<Spinner />}
            >
              <Text fontSize={20} fontWeight="bold">
                Let's Rock! 🎸
              </Text>
            </Button>
          </YStack>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
}
