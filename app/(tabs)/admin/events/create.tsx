import React, { useState } from "react";
import { Alert } from "react-native";
import { Button, Input, YStack, Form, Label, Image, Select } from "tamagui";
import { useRouter } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/services/firebase";
import { PageContainer } from "@/components/layout/PageContainer";
import * as ImagePicker from "expo-image-picker";
import { Event } from "@/models/Event";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [genres, setGenres] = useState("");
  const [lineup, setLineup] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateEvent = async () => {
    if (!title || !date || !location || !image) {
      Alert.alert(
        "Error",
        "Please fill in all required fields and select an image",
      );
      return;
    }

    try {
      // Upload image
      const imageUri = image;
      const imageRef = ref(storage, `events/${Date.now()}`);
      const response = await fetch(imageUri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      const now = Timestamp.now();
      const newEvent: Omit<Event, "id"> = {
        title,
        title_lowercase: title.toLowerCase(),
        caption,
        date: Timestamp.fromDate(new Date(date)),
        location,
        price: parseFloat(price),
        genres: genres.split(",").map((g) => g.trim()),
        lineup: lineup.split(",").map((l) => l.trim()),
        image: {
          id: imageRef.name,
          url: imageUrl,
          path: imageRef.fullPath,
          altText: title, // Using title as alt text, consider adding a separate field for this
        },
        attendeeCount: 0,
        status,
        createdAt: now,
        updatedAt: now,
        publishedAt: status === "published" ? now : null,
        deletedAt: null,
        metadata: {}, // Empty object for now, can be used for custom fields later
      };

      const docRef = await addDoc(collection(db, "events"), newEvent);

      Alert.alert("Success", "Event created successfully!");
      router.back();
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to create event. Please try again.");
    }
  };

  return (
    <PageContainer>
      <Form onSubmit={handleCreateEvent}>
        <YStack space>
          <Button onPress={pickImage}>Pick an image</Button>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChangeText={setTitle} />

          <Label htmlFor="caption">Caption</Label>
          <Input id="caption" value={caption} onChangeText={setCaption} />

          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />

          <Label htmlFor="location">Location</Label>
          <Input id="location" value={location} onChangeText={setLocation} />

          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Label htmlFor="genres">Genres (comma-separated)</Label>
          <Input id="genres" value={genres} onChangeText={setGenres} />

          <Label htmlFor="lineup">Lineup (comma-separated)</Label>
          <Input id="lineup" value={lineup} onChangeText={setLineup} />

          <Label htmlFor="status">Status</Label>
          <Select id="status" value={status} onValueChange={setStatus as any}>
            <Select.Trigger width={200} height={50}>
              <Select.Value placeholder="Choose status" />
            </Select.Trigger>

            <Select.Content zIndex={200000}>
              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Label>Status</Select.Label>
                  <Select.Item index={0} value="draft">
                    <Select.ItemText>Draft</Select.ItemText>
                  </Select.Item>
                  <Select.Item index={1} value="published">
                    <Select.ItemText>Published</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>

          <Form.Trigger asChild>
            <Button>Create Event</Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </PageContainer>
  );
}
