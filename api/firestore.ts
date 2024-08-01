// src/services/databaseService.ts
import {
  Query,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  queryEqual,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import { Event } from "@/models/Event";
import { UserData } from "@/models/UserData";

import { FilterValues } from "@/components/FilterDialog";

import { db } from "../services/firebase";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};
export const queryUserByUsername = async (username: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log("Username is taken");
      return false;
    } else {
      console.log("No user found with username:", username);
      return true;
    }
  } catch (error) {
    console.error("Error querying user by username:", error);
    return false;
  }
};
export const submitPlayInfo = async (data: PlayData) => {
  try {
    const docRef = await addDoc(collection(db, "play"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Optionally return something if needed
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to submit play info");
  }
};
export const updateUserProfile = async (
  userId: string,
  profileData: Partial<UserData>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, profileData);
    console.log("User profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
};

export async function fetchFilteredEvents(
  filters: FilterValues,
  page: number,
  pageSize: number
): Promise<Event[]> {
  const eventsRef = collection(db, "events");
  let q = query(eventsRef);

  // Apply filters
  if (filters.selectedGenres.length > 0) {
    q = query(q, where("genres", "array-contains-any", filters.selectedGenres));
  }

  if (filters.selectedArtists.length > 0) {
    q = query(
      q,
      where("lineup", "array-contains-any", filters.selectedArtists)
    );
  }

  if (filters.includeOldEvents) {
    q = query(q, where("date", ">=", new Date()));
  }

  // Apply sorting
  if (filters.priceSort === "lowToHigh") {
    q = query(q, orderBy("price", "asc"));
  } else if (filters.priceSort === "highToLow") {
    q = query(q, orderBy("price", "desc"));
  } else if (filters.priceSort === "free") {
    q = query(q, where("price", "==", 0));
  } else {
    q = query(q, orderBy("date", "desc"));
  }

  // Apply pagination
  q = query(q, limit(pageSize));
  if (page > 0) {
    const lastVisible = await getLastVisibleDocument(q, page, pageSize);
    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as unknown as Event)
  );
}

async function getLastVisibleDocument(
  q: Query,
  page: number,
  pageSize: number
) {
  if (page === 0) return null;
  const lastVisibleSnapshot = await getDocs(query(q, limit(page * pageSize)));
  return lastVisibleSnapshot.docs[lastVisibleSnapshot.docs.length - 1];
}
