import React from "react";
import { Link } from "expo-router";
import {
  XStack,
  YStack,
  Text,
  Separator,
  useTheme,
  useMedia,
  Stack,
} from "tamagui";
import { Facebook, Instagram, Twitter } from "@tamagui/lucide-icons";

export const Footer = () => {
  const theme = useTheme();
  const media = useMedia();

  return (
    <YStack
      backgroundColor="$backgroundStrong"
      paddingVertical="$6"
      paddingHorizontal="$4"
      elevation={10}
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.1}
      shadowRadius={10}
    >
      <Stack maxWidth={1200} width="100%" marginHorizontal="auto">
        <XStack
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="$6"
        >
          <FooterColumn title="Sekta Selekta">
            <Text fontSize="$3" color="$color9Light">
              Bringing the best events to you. Nowa 3/3, Kraków.
            </Text>
          </FooterColumn>

          <FooterColumn title="Explore">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/">Events</FooterLink>
            <FooterLink href="/">About Us</FooterLink>
          </FooterColumn>

          <FooterColumn title="Contact">
            <Text fontSize="$3" color="$color9Light">
              Email: info@sektaselekta.com
            </Text>
            <Text fontSize="$3" color="$color9Light">
              Phone: +1 234 567 890
            </Text>
          </FooterColumn>

          <FooterColumn title="Follow Us">
            <XStack gap="$4">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Twitter} />
            </XStack>
          </FooterColumn>
        </XStack>

        <Separator marginVertical="$5" />

        <XStack justifyContent="space-between" flexWrap="wrap" gap="$4">
          <Text fontSize="$2" color="$color8Light">
            © 2024 Sekta Selekta
          </Text>
          <XStack gap="$4">
            <FooterLink href="/privacy-policy" small>
              Privacy Policy
            </FooterLink>
            <FooterLink href="/tos" small>
              Terms of Service
            </FooterLink>
          </XStack>
        </XStack>
      </Stack>
    </YStack>
  );
};

const FooterColumn = ({ title, children }: any) => (
  <YStack
    gap="$3"
    flex={1}
    minWidth={200}
    $gtSm={{ minWidth: 150 }}
    $gtMd={{ minWidth: 200 }}
  >
    <Text
      fontSize="$5"
      fontWeight="bold"
      color="$color"
      borderBottomWidth={2}
      borderBottomColor="$color5Light"
      paddingBottom="$2"
    >
      {title}
    </Text>
    {children}
  </YStack>
);

const FooterLink = ({ href, children, small = false }: any) => (
  <Link href={href}>
    <Text
      fontSize={small ? "$2" : "$3"}
      color="$color7Light"
      hoverStyle={{ color: "$color9Light" }}
      transition="all 0.2s"
    >
      {children}
    </Text>
  </Link>
);

const SocialIcon = ({ Icon }: any) => (
  <Stack
    backgroundColor="$color2Light"
    padding="$2"
    borderRadius="$3"
    hoverStyle={{
      backgroundColor: "$color3Light",
      transform: [{ scale: 1.1 }],
    }}
    pressStyle={{
      backgroundColor: "$color4Light",
      transform: [{ scale: 0.95 }],
    }}
    transition="all 0.2s"
  >
    <Icon size={20} color="$color" />
  </Stack>
);
