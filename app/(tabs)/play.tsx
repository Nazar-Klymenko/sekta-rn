import {
  AudioLines,
  Facebook,
  Instagram,
  Type as LucideIcon,
  Mail,
  MapPin,
  Phone,
  Square,
  Youtube,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import React from "react";

import { Platform } from "react-native";

import { usePlaySubmission } from "@/hooks/usePlay";

import { BlurView } from "expo-blur";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Image,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
  useTheme,
  useWindowDimensions,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";

const playSchema = yup.object({
  email: yup.string().email("Invalid email address").required(),
  phone: yup.string().optional(),
  soundcloud: yup.string().optional(),
  youtube: yup.string().optional(),
  instagram: yup.string().optional(),
  facebook: yup.string().optional(),
  additionalInfo: yup.string().optional(),
});

type FormValues = yup.InferType<typeof playSchema>;

const portfolioLinks = [
  {
    name: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "@username",
  },
  {
    name: "soundcloud",
    label: "Soundcloud",
    icon: AudioLines,
    placeholder: "https://soundcloud.com/",
  },
  {
    name: "youtube",
    label: "Youtube",
    icon: Youtube,
    placeholder: "https://www.youtube.com/",
  },
  {
    name: "facebook",
    label: "Facebook",
    icon: Facebook,
    placeholder: "https://www.facebook.com/",
  },
];

export default function PlayScreen() {
  const theme = useTheme();
  const toast = useToastController();
  const playSubmission = usePlaySubmission();

  const methods = useForm<FormValues>({
    resolver: yupResolver(playSchema),
    defaultValues: {
      email: "",
      phone: "",
      soundcloud: "",
      youtube: "",
      instagram: "",
      facebook: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    playSubmission.mutate(data, {
      onSuccess: () => {
        toast.show("Application Submitted", {
          message: "Your play info has been submitted successfully!",
          variant: "success",
        });
        methods.reset();
      },
      onError: (error) => {
        toast.show("Submission Failed", {
          message: error instanceof Error ? error.message : "An error occurred",
          variant: "error",
        });
      },
    });
  };

  return (
    <YStack flex={1}>
      <HeroSection />

      <YStack
        backgroundColor="$background"
        padding="$4"
        flex={1}
        gap="$4"
        marginHorizontal="auto"
        width="100%"
        maxWidth={740}
      >
        <VenueInfoSection />
        <YStack gap="$2">
          <Text fontSize={24} fontWeight="bold">
            Apply to Play
          </Text>
          <Text fontSize="$4" color="$gray10Light">
            Share your details and we'll be in touch
          </Text>
        </YStack>

        <Form methods={methods} maxWidth={740} flex={1} jc="center">
          <Input
            id="play-email"
            name="email"
            label="Contact Email"
            placeholder="email@gmail.com"
            icon={Mail}
          />
          <Input
            id="play-phone"
            name="phone"
            label="Phone Number (Optional)"
            placeholder="+48 577 925 024"
            icon={Phone}
          />
          <Text fontSize={20} fontWeight="bold">
            Portfolio Links (Optional)
          </Text>
          {portfolioLinks.map(({ name, icon, placeholder, label }, idx) => (
            <Input
              key={name + idx}
              id={"play-" + name}
              label={label}
              name={name}
              icon={icon}
              placeholder={placeholder}
            />
          ))}
          <Input
            id="play-additional-info"
            name="additionalInfo"
            label="Additional Info"
            multiline
            placeholder="Any additional information you'd like to share..."
            rows={4}
            verticalAlign="top"
          />
          <PrimaryButton
            onPress={methods.handleSubmit(onSubmit)}
            text="Send application"
            isLoading={playSubmission.isPending}
            disabled={playSubmission.isPending}
          />
        </Form>
      </YStack>
    </YStack>
  );
}
const HeroSection = () => {
  const { width, height } = useWindowDimensions();
  const isWideScreen = width > height;
  const imageHeight =
    Platform.OS === "web" ? (isWideScreen ? "95vh" : 500) : 500;

  return (
    <YStack height={imageHeight} overflow="hidden">
      <Image
        source={require("@/assets/images/play_bg.jpg")}
        alt="Venue background"
        width="100%"
        height="100%"
        objectFit="cover"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <YStack gap="$2" maxWidth={600}>
          <Text
            fontSize={40}
            fontWeight="bold"
            color="white"
            textShadowColor="rgba(0,0,0,0.75)"
            textShadowOffset={{ width: -1, height: 1 }}
            textShadowRadius={10}
          >
            Play at Our Venue
          </Text>
          <Text fontSize={20} color="white" opacity={0.8}>
            Perform a set at our venue with other artists
          </Text>
        </YStack>
      </LinearGradient>
    </YStack>
  );
};
type VenueInfoItem = {
  title: string;
  content: string;
  icon: typeof LucideIcon;
};

const venueInfo: VenueInfoItem[] = [
  { title: "Location", content: "Nowa 3/3, Kraków", icon: MapPin },
  { title: "Venue Size", content: "30m²", icon: Square },
  { title: "Instagram", content: "4K Followers", icon: Instagram },
];

const VenueInfoSection = () => (
  <Card
    elevate
    size="$4"
    bordered
    maxWidth={740}
    animation="quickest"
    hoverStyle={{ scale: 0.99 }}
    pressStyle={{ scale: 0.99 }}
  >
    <Card.Header padded>
      <Text fontSize="$6" fontWeight="bold" color="$color12">
        Venue Details
      </Text>
    </Card.Header>
    <Separator />
    <Card.Footer padded display="flex">
      <XStack display="flex" flex={1} justifyContent="space-between">
        {venueInfo.map((item, index) => (
          <YStack
            key={index}
            alignItems="center"
            gap="$2"
            flex={1}
            minWidth={100}
            marginVertical="$2"
          >
            <item.icon size={24} color="$color11Light" />
            <YStack alignItems="center">
              <Text fontSize="$3" fontWeight="bold" color="$color11">
                {item.title}
              </Text>
              <Text fontSize="$2" color="$color10" textAlign="center">
                {item.content}
              </Text>
            </YStack>
          </YStack>
        ))}
      </XStack>
    </Card.Footer>
  </Card>
);
