import { AnimatePresence } from "@tamagui/animate-presence";
import {
  ArrowLeft,
  AudioLines,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "@tamagui/lucide-icons";

import React from "react";

import { useResident } from "@/hooks/useResidents";

import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  Button,
  GetProps,
  Image,
  Text,
  Theme,
  XStack,
  YStack,
  styled,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

const HeroContainer = styled(YStack, {
  height: 500,
  width: "100%",
  position: "relative",
  overflow: "hidden",
});

const HeroContent = styled(YStack, {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 40,
  zIndex: 3, // Highest z-index to appear on top
});

const ResidentName = styled(Text, {
  fontSize: 72,
  fontWeight: "900",
  color: "white",
});

const GenreTag = styled(Text, {
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.2)",
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 16,
  marginRight: 10,
  marginBottom: 10,
});

const InfoCard = styled(YStack, {
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: 20,
  padding: 20,
  backdropFilter: "blur(10px)",
  marginBottom: 20,
});

const SocialButton = styled(Button, {
  backgroundColor: "rgba(255,255,255,0.2)",
  borderRadius: 50,
  padding: 15,
});

export default function ResidentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: resident, isLoading, error } = useResident(id);
  const router = useRouter();

  if (isLoading) return <FullPageLoading />;
  if (error || !resident) {
    return (
      <PageContainer>
        <Text>
          Error loading resident details:{" "}
          {error?.message || "Resident not found"}
        </Text>
      </PageContainer>
    );
  }

  return (
    <Theme name="dark">
      <PageContainer scrollable>
        <HeroContainer>
          <Image
            source={{ uri: resident.image.publicUrl }}
            objectFit="cover"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
            }}
          />
          <HeroContent>
            <AnimatePresence>
              <ResidentName
                key="name"
                animation="lazy"
                enterStyle={{ opacity: 0, scale: 0.9 }}
                exitStyle={{ opacity: 0, scale: 0.9 }}
                pressStyle={{ scale: 0.95 }}
              >
                {resident.displayName}
              </ResidentName>
              <XStack flexWrap="wrap" marginTop={20}>
                {resident.genres.map((genre, index) => (
                  <GenreTag
                    key={genre}
                    animation="lazy"
                    enterStyle={{ opacity: 0, scale: 0.9 }}
                    exitStyle={{ opacity: 0, scale: 0.9 }}
                    pressStyle={{ scale: 0.95 }}
                  >
                    {genre}
                  </GenreTag>
                ))}
              </XStack>
            </AnimatePresence>
          </HeroContent>
        </HeroContainer>

        <YStack gap={30}>
          <InfoCard>
            <Text
              fontSize={24}
              fontWeight="bold"
              color="white"
              marginBottom={10}
            >
              Locations
            </Text>
            <XStack flexWrap="wrap" gap={10}>
              {resident.locations.map((location, index) => (
                <Text key={index} fontSize={18} color="white">
                  <MapPin size={18} /> {location}
                </Text>
              ))}
            </XStack>
          </InfoCard>

          <InfoCard>
            <Text
              fontSize={24}
              fontWeight="bold"
              color="white"
              marginBottom={10}
            >
              Contact
            </Text>
            <YStack gap={10}>
              {resident.email && (
                <XStack alignItems="center" gap={10}>
                  <Mail size={18} color="white" />
                  <Text fontSize={18} color="white">
                    {resident.email}
                  </Text>
                </XStack>
              )}
              {resident.phone && (
                <XStack alignItems="center" gap={10}>
                  <Phone size={18} color="white" />
                  <Text fontSize={18} color="white">
                    {resident.phone}
                  </Text>
                </XStack>
              )}
            </YStack>
          </InfoCard>

          <InfoCard>
            <Text
              fontSize={24}
              fontWeight="bold"
              color="white"
              marginBottom={10}
            >
              Social Media
            </Text>
            <XStack flexWrap="wrap" gap={20}>
              {resident.socialMedia.soundcloud && (
                <SocialButton icon={<AudioLines color="white" />} />
              )}
              {resident.socialMedia.youtube && (
                <SocialButton icon={<Youtube color="white" />} />
              )}
              {resident.socialMedia.instagram && (
                <SocialButton icon={<Instagram color="white" />} />
              )}
              {resident.socialMedia.facebook && (
                <SocialButton icon={<Facebook color="white" />} />
              )}
            </XStack>
          </InfoCard>

          {resident.additionalInfo && (
            <InfoCard>
              <Text
                fontSize={24}
                fontWeight="bold"
                color="white"
                marginBottom={10}
              >
                Additional Info
              </Text>
              <Text fontSize={18} color="white">
                {resident.additionalInfo}
              </Text>
            </InfoCard>
          )}
        </YStack>
      </PageContainer>
    </Theme>
  );
}
