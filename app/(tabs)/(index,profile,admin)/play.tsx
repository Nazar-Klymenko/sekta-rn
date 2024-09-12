import MaskedView from "@react-native-masked-view/masked-view";
import {
  AudioLines,
  Facebook,
  Instagram,
  Type as LucideIcon,
  Mail,
  MapPin,
  Phone,
  Play,
  Square,
  Youtube,
} from "@tamagui/lucide-icons";
import { Disc } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import React, { useRef } from "react";

import { Platform } from "react-native";

import { usePlaySubmission } from "@/hooks/usePlay";
import { emailSchema } from "@/utils/validationSchemas";

import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import { useForm } from "react-hook-form";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  Image,
  ScrollView,
  Separator,
  Text,
  TextStyle,
  View,
  XStack,
  YStack,
  styled,
  useTheme,
  useWindowDimensions,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PageContainer } from "@/components/layout/PageContainer";

const playSchema = yup.object({
  email: emailSchema,
  phone: yup.string().optional(),
  soundcloud: yup.string().optional(),
  youtube: yup.string().optional(),
  instagram: yup.string().optional(),
  facebook: yup.string().optional(),
  additionalInfo: yup
    .string()
    .optional()
    .max(1000, "Please keep it shorter 👽"),
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
    mode: "onTouched",
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
    <PageContainer fullWidth>
      <Stack.Screen
        options={{
          animation: "fade_from_bottom",
          title: "Play",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <EnhancedHeroSection />
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

        <Form methods={methods} maxWidth={740} flex={1}>
          <Text fontSize={20} fontWeight="bold">
            Contact Information
          </Text>
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
            rows={6}
            verticalAlign="top"
            maxLength={1000}
          />
          <PrimaryButton
            onPress={methods.handleSubmit(onSubmit)}
            text="Send application"
            isLoading={playSubmission.isPending}
            disabled={playSubmission.isPending}
          />
        </Form>
      </YStack>
    </PageContainer>
  );
}

const EnhancedHeroSection = () => {
  const { width, height } = useWindowDimensions();
  const isWideScreen = width > height;
  const imageHeight =
    Platform.OS === "web" ? (isWideScreen ? "95vh" : 500) : 600;
  return (
    <>
      <YStack height={imageHeight} overflow="hidden">
        <Image
          source={require("@/assets/images/play_bg.jpg")}
          alt="Venue background"
          width="100%"
          height="100%"
          objectFit="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)"]}
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
          <Animated.View entering={FadeInDown.duration(400)}>
            <YStack gap="$4" alignItems="center">
              {Platform.OS !== "android" && (
                <BlurView
                  intensity={80}
                  tint="dark"
                  style={{ borderRadius: 50, padding: 15 }}
                >
                  <Disc size={50} color="white" />
                </BlurView>
              )}
              <YStack>
                <GradientText
                  text="Play at SEKTA SELEKTA"
                  colors={[
                    "#FF1493",
                    "#FF4500",
                    "#FFD700",
                    "#00CED1",
                    "#8A2BE2",
                  ]}
                  style={{
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                />
              </YStack>
              <Text
                fontSize={24}
                color="white"
                opacity={0.9}
                textAlign="center"
                fontWeight="500"
                style={{
                  textShadowColor: "rgba(0,0,0,0.75)",
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 5,
                }}
              >
                Perform a set at our venue with other artists
              </Text>
            </YStack>
          </Animated.View>
        </LinearGradient>
      </YStack>
    </>
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
    hoverStyle={{ scale: 1.02 }}
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
              <Text fontSize="$4" fontWeight="bold" color="$color11">
                {item.title}
              </Text>
              <Text fontSize="$3" color="$color10" textAlign="center">
                {item.content}
              </Text>
            </YStack>
          </YStack>
        ))}
      </XStack>
    </Card.Footer>
  </Card>
);
const StyledText = styled(Text, {
  fontSize: 72,
  fontWeight: "900",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: -2,
});

interface GradientTextProps {
  text: string;
  colors: string[];
  style?: TextStyle;
}

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  colors,
  style,
}) => {
  if (Platform.OS === "web") {
    return (
      <StyledText
        style={{
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
          ...style,
        }}
      >
        {text}
      </StyledText>
    );
  }

  return (
    <MaskedView maskElement={<StyledText>{text}</StyledText>}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StyledText style={{ opacity: 0 }}>{text}</StyledText>
      </LinearGradient>
    </MaskedView>
  );
};