import React, { useEffect, useState } from "react";

import { User as FirebaseUser } from "firebase/auth";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useDisableScroll } from "@/features/core/hooks/useDisableScroll";
import { useUserData } from "@/features/users/hooks/useUserData";

import {
  Bell,
  BoomBox,
  Heart,
  Home,
  LogIn,
  LogOut,
  Menu,
  Play,
  Settings,
  User,
  UserRoundCheck,
  X,
} from "@tamagui/lucide-icons";

import {
  AnimatePresence,
  Avatar,
  Button,
  Image,
  Paragraph,
  SizableText,
  Stack,
  StackProps,
  XStack,
  YStack,
  styled,
  useMedia,
} from "tamagui";

import { Link, usePathname, useRouter } from "expo-router";

import { Tooltip } from "../panels/Tooltip";
import { NavLink, NavLinkButton } from "./NavLink";

// Interfaces
interface HeaderProps {
  title: string;
  user?: FirebaseUser | null;
}

// Components

export const CustomHeader: React.FC<HeaderProps> = ({ title, user }) => {
  const router = useRouter();
  const media = useMedia();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user: _user } = useAuth();
  const { data: userData } = useUserData(_user?.uid || "");
  const isSmallScreen = !media.gtMd;
  const pathname = usePathname();
  const isEventDetailPage =
    pathname.startsWith("/events/") && pathname !== "/events";

  const navLinks = [
    { href: "/", icon: <Home size={24} color="$color" />, label: "Home" },

    ...(userData?.isAdmin
      ? [
          {
            href: "/admin",
            icon: <UserRoundCheck size={24} color="$color" />,
            label: "Admin",
          },
        ]
      : []),
  ];

  return (
    <HeaderWrapper
      //@ts-ignore
      position="sticky"
      top={0}
      left={0}
      right={0}
      style={
        !isMenuOpen
          ? { backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }
          : {}
      }
    >
      <HeaderContainer>
        <Stack maxWidth={1200} width="100%" marginHorizontal="auto">
          <XStack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Link href="/">
              <XStack alignItems="center">
                <Image
                  source={require("@/assets/images/logo.png")}
                  alt="Logo"
                  height={60}
                  width={60}
                />
                <LogoText>{title}</LogoText>
              </XStack>
            </Link>
            {/* {isEventDetailPage && (
              <Button onPress={() => router.push("/events")}>
                Back to Events
              </Button>
            )} */}
            <XStack alignItems="center" gap="$4">
              {isSmallScreen && (
                <IconButton onPress={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? (
                    <X size={24} color="$color" />
                  ) : (
                    <Menu size={24} color="$color" />
                  )}
                </IconButton>
              )}
            </XStack>
          </XStack>
        </Stack>
      </HeaderContainer>

      <AnimatePresence>
        {isSmallScreen && isMenuOpen && (
          <>
            <Overlay
              key="overlay"
              animation="quickest"
              opacity={0.5}
              exitStyle={{ opacity: 0 }}
              onPress={() => setIsMenuOpen(false)}
            />
            <MobileMenu
              key="menu"
              animation="quickest"
              x={0}
              opacity={1}
              scale={1}
              enterStyle={{ x: 300, opacity: 0, scale: 1 }}
              exitStyle={{ x: 300, opacity: 0, scale: 1 }}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  onPress={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
};

// Styled components
const HeaderWrapper = styled(Stack, {
  zIndex: 100,
  backgroundColor: "rgba(19, 19, 22, 0.7)",
} as StackProps);

const HeaderContainer = styled(XStack, {
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
  alignItems: "center",
  justifyContent: "space-between",
  height: 60,
});

const LogoText = styled(Paragraph, {
  fontSize: "$5",
  fontWeight: "bold",
  color: "$color",
});

const IconButton = styled(Button, {
  size: "$4",
  circular: true,
  backgroundColor: "transparent",
});

const MobileMenu = styled(YStack, {
  //@ts-ignore
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "80%",
  maxWidth: 300,
  backgroundColor: "$background",
  borderLeftWidth: 1,
  borderLeftColor: "$borderColor",
  padding: "$4",
  gap: "$4",
  zIndex: 1000,
});

const Overlay = styled(Stack, {
  //@ts-ignore
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
});
