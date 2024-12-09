import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Facebook, Instagram, Mail, Phone } from "@tamagui/lucide-icons";

import { Card, Paragraph, XStack, YStack } from "tamagui";

type ContactInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

export default function ContactScreen() {
  return (
    <PageContainer maxWidth={640}>
      <YStack gap="$6" padding="$6">
        <Paragraph fontSize="$8" fontWeight="700" alignSelf="center">
          Contact Us
        </Paragraph>
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
            <Paragraph href="https://facebook.com/sektaselekta" target="_blank">
              link
            </Paragraph>
          }
        />
      </YStack>
    </PageContainer>
  );
}
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
    borderRadius="$6"
  >
    <XStack alignItems="center" gap="$4">
      {icon}
      <YStack>
        <Paragraph fontSize="$5" fontWeight="600">
          {label}
        </Paragraph>
        <Paragraph fontSize="$4" color="$gray11">
          {value}
        </Paragraph>
      </YStack>
    </XStack>
  </Card>
);
