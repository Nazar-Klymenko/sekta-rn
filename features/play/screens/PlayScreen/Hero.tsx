import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { Platform } from "react-native";

import { Disc } from "@tamagui/lucide-icons";

import {
  Image,
  Paragraph,
  TextStyle,
  YStack,
  styled,
  useWindowDimensions,
} from "tamagui";

import { BlurView } from "expo-blur";
import Animated, { FadeInDown } from "react-native-reanimated";

export const HeroSection = () => {
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
              <Paragraph
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
              </Paragraph>
            </YStack>
          </Animated.View>
        </LinearGradient>
      </YStack>
    </>
  );
};
const StyledText = styled(Paragraph, {
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
