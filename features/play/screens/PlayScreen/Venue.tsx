import React from "react";

import { View } from "react-native";

import { Instagram, MapPin, Square } from "@tamagui/lucide-icons";

import { Card, Paragraph, Separator, XStack, YStack } from "tamagui";

import { VenueInfoItem } from "../../types";

const venueInfo: VenueInfoItem[] = [
  { title: "Location", content: "Nowa 3/3, Kraków", icon: MapPin },
  { title: "Venue Size", content: "30m²", icon: Square },
  { title: "Instagram", content: "4K Followers", icon: Instagram },
];

export const VenueInfoSection = () => (
  <View style={{ padding: 16 }}>
    <Card
      elevate
      size="$4"
      bordered
      maxWidth={740}
      hoverStyle={{ scale: 1.02 }}
      pressStyle={{ scale: 0.99 }}
    >
      <Card.Header padded>
        <Paragraph fontSize="$6" fontWeight="bold" color="$color12">
          Venue Details
        </Paragraph>
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
                <Paragraph fontSize="$4" fontWeight="bold" color="$color11">
                  {item.title}
                </Paragraph>
                <Paragraph fontSize="$3" color="$color10" textAlign="center">
                  {item.content}
                </Paragraph>
              </YStack>
            </YStack>
          ))}
        </XStack>
      </Card.Footer>
    </Card>
  </View>
);
