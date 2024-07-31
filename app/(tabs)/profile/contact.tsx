import { Facebook, Instagram, Mail, Phone } from "@tamagui/lucide-icons";

import React from "react";

import { Card, Separator, Text, Theme, XStack, YStack } from "tamagui";

import { PageContainer } from "@/components/layout/PageContainer";

type ContactInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value }) => (
  <Card
    backgroundColor="$background"
    shadowColor="$shadowColor"
    shadowRadius="$4"
    hoverStyle={{
      backgroundColor: "$backgroundHover",
      shadowRadius: "$6",
    }}
    pressStyle={{
      backgroundColor: "$backgroundPress",
      shadowRadius: "$2",
    }}
    padding="$4"
    borderRadius="$2"
  >
    <XStack alignItems="center" gap="$4">
      {icon}
      <YStack>
        <Text fontSize="$5" fontWeight="600">
          {label}
        </Text>
        <Text fontSize="$4" color="$gray11">
          {value}
        </Text>
      </YStack>
    </XStack>
  </Card>
);

export default function Contact() {
  return (
    <PageContainer>
      <YStack gap="$6" padding="$6">
        <Text fontSize="$8" fontWeight="700" alignSelf="center">
          Contact Us
        </Text>
        <ContactInfo
          icon={<Mail size={24} color="$blue10Light" />}
          label="Email"
          value="sektaselekta@gmail.com"
        />
        <ContactInfo
          icon={<Phone size={24} color="$blue10Light" />}
          label="Phone"
          value="+48 734 481 823"
        />
        <ContactInfo
          icon={<Instagram size={24} color="#E1306C" />}
          label="Instagram"
          value="@sektaseletka"
        />
        <ContactInfo
          icon={<Facebook size={24} color="#3b5998" />}
          label="Facebook"
          value={
            <Text href="https://facebook.com/sektaselekta" target="_blank">
              link
            </Text>
          }
        />
      </YStack>
    </PageContainer>
  );
}
