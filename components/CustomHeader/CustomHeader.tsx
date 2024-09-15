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
import { User as FirebaseUser } from "firebase/auth";

import React, { useEffect, useState } from "react";

import { signOut } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useUserData } from "@/hooks/useUserData";

import { Link, useRouter } from "expo-router";
import {
  AnimatePresence,
  Avatar,
  Button,
  Image,
  Stack,
  StackProps,
  Text,
  XStack,
  YStack,
  styled,
  useMedia,
} from "tamagui";

import { Tooltip } from "../Tooltip";
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
  const { isLoggedIn, user: _user } = useAuth();
  const { data: userData } = useUserData(_user?.uid || "");
  const isSmallScreen = !media.gtMd;

  const navLinks = [
    { href: "/", icon: <Home size={24} color="$color" />, label: "Home" },
    {
      href: "/saved",
      icon: <Heart size={24} color="$color" />,
      label: "Favorites",
    },
    {
      href: "/residents",
      icon: <BoomBox size={24} color="$color" />,
      label: "Residents",
    },
    { href: "/play", icon: <Play size={24} color="$color" />, label: "Play" },
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

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  // useDisableScroll(isMenuOpen);

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

            {!isSmallScreen && (
              <XStack alignItems="center" gap="$6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </XStack>
            )}

            <XStack alignItems="center" gap="$4">
              <Tooltip content="Notifications">
                <IconButton onPress={() => router.push("/")}>
                  <Bell size={24} color="$color" />
                </IconButton>
              </Tooltip>

              {!isSmallScreen && (
                <Tooltip content="Profile">
                  <Avatar
                    circular
                    cursor="pointer"
                    size="$4"
                    onPress={() => router.push("/profile")}
                  >
                    {user?.photoURL ? (
                      <Avatar.Image src={user.photoURL} />
                    ) : (
                      <Avatar.Fallback
                        backgroundColor="$blue10Light"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <User size={24} color="$color" />
                      </Avatar.Fallback>
                    )}
                  </Avatar>
                </Tooltip>
              )}
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
              <UserPreview>
                <Avatar circular size="$5">
                  {user?.photoURL ? (
                    <Avatar.Image src={user.photoURL} />
                  ) : (
                    <Avatar.Fallback
                      backgroundColor="$blue10Light"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <User size={24} color="$color" />
                    </Avatar.Fallback>
                  )}
                </Avatar>
                <YStack>
                  <Text fontSize="$4" fontWeight="bold">
                    {user?.displayName || "Guest"}
                  </Text>
                  <Text fontSize="$3" color="$gray10Light">
                    {user?.email || "Not logged in"}
                  </Text>
                </YStack>
              </UserPreview>

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

              <NavLink
                href="/profile"
                icon={<Settings size={24} color="$color" />}
                onPress={() => setIsMenuOpen(false)}
              >
                Settings
              </NavLink>

              {user ? (
                <NavLinkButton
                  onPress={signOut}
                  icon={<LogOut size={24} color="$color" />}
                >
                  Sign Out
                </NavLinkButton>
              ) : (
                <NavLink
                  href="/auth/login"
                  icon={<LogIn size={24} color="$color" />}
                  onPress={() => setIsMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              )}
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

const LogoText = styled(Text, {
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

const UserPreview = styled(XStack, {
  alignItems: "center",
  gap: "$3",
  paddingVertical: "$4",
  paddingHorizontal: "$2",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
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
