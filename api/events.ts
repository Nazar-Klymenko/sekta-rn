import {
  Query,
  Timestamp,
  addDoc,
  collection,
  doc,
  limit as firestoreLimit,
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
import { db } from "@/services/firebase";

import { FilterValues } from "@/components/FilterDialog";

const eventsCollection = collection(db, "events");

export const fetchEvents = async (): Promise<Event[]> => {
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Event,
  );
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const docRef = doc(eventsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Event;
  } else {
    throw new Error("Event not found");
  }
};
export const fetchLikedEvents = async (userId: string): Promise<Event[]> => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("User not found");
  }

  const userData = userDoc.data();
  const likedEventIds = userData.likedEvents || [];

  // Fetch all liked events
  const eventPromises = likedEventIds.map(async (eventId: string) => {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() } as Event;
    }
    return null;
  });

  const events = await Promise.all(eventPromises);
  return events.filter((event): event is Event => event !== null);
};

export const fetchLikedEventsId = async (userId: string): Promise<string[]> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (!userDoc.exists()) {
    throw new Error("User not found");
  }
  return userDoc.data()?.likedEvents || [];
};

export const fetchPreviousEvents = async (
  pageParam: number,
  pageSize: number,
): Promise<Event[]> => {
  const now = new Date();
  let q = query(
    collection(db, "events"),
    where("date", "<", now),
    orderBy("date", "desc"),
  );

  // Apply pagination
  if (pageParam > 0) {
    const snapshot = await getDocs(q);
    const lastVisible = snapshot.docs[pageParam * pageSize - 1];
    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }
  }

  q = query(q, limit(pageSize));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event);
};

export const fetchUpcomingEvents = async (
  count: number = 3,
): Promise<Event[]> => {
  const now = new Date();
  const q = query(
    collection(db, "events"),
    where("date", ">=", now),
    orderBy("date", "asc"),
    firestoreLimit(count),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event);
};

// async function getLastVisibleDocument(
//   q: Query,
//   page: number,
//   pageSize: number,
// ) {
//   if (page === 0) return null;
//   const lastVisibleSnapshot = await getDocs(query(q, limit(page * pageSize)));
//   return lastVisibleSnapshot.docs[lastVisibleSnapshot.docs.length - 1];
// }
// export const fetchFilteredEventsBySearch = async (
//   searchQuery: string,
//   lastDoc: any | null,
//   pageSize: number,
// ): Promise<{ events: Event[]; lastDoc: any }> => {
//   let q = query(collection(db, "events"), orderBy("date", "desc"));

//   if (searchQuery) {
//     q = query(
//       q,
//       where("searchableFields", "array-contains", searchQuery.toLowerCase()),
//     );
//   }

//   q = query(q, limit(pageSize));

//   if (lastDoc) {
//     q = query(q, startAfter(lastDoc));
//   }

//   const snapshot = await getDocs(q);
//   const events = snapshot.docs.map(
//     (doc) => ({ id: doc.id, ...doc.data() }) as Event,
//   );
//   const newLastDoc = snapshot.docs[snapshot.docs.length - 1];

//   return { events, lastDoc: newLastDoc };
// };

// export async function fetchFilteredEvents(
//   filters: FilterValues,
//   page: number,
//   pageSize: number,
// ): Promise<Event[]> {
//   const eventsRef = collection(db, "events");
//   let q = query(eventsRef);

//   // Apply filters
//   if (filters.selectedGenres.length > 0) {
//     q = query(q, where("genres", "array-contains-any", filters.selectedGenres));
//   }

//   if (filters.selectedArtists.length > 0) {
//     q = query(
//       q,
//       where("lineup", "array-contains-any", filters.selectedArtists),
//     );
//   }

//   if (filters.includeOldEvents) {
//     q = query(q, where("date", ">=", new Date()));
//   }

//   // Apply sorting
//   if (filters.priceSort === "lowToHigh") {
//     q = query(q, orderBy("price", "asc"));
//   } else if (filters.priceSort === "highToLow") {
//     q = query(q, orderBy("price", "desc"));
//   } else if (filters.priceSort === "free") {
//     q = query(q, where("price", "==", 0));
//   } else {
//     q = query(q, orderBy("date", "desc"));
//   }

//   // Apply pagination
//   q = query(q, limit(pageSize));
//   if (page > 0) {
//     const lastVisible = await getLastVisibleDocument(q, page, pageSize);
//     if (lastVisible) {
//       q = query(q, startAfter(lastVisible));
//     }
//   }

//   const snapshot = await getDocs(q);
//   return snapshot.docs.map(
//     (doc) => ({ id: doc.id, ...doc.data() }) as unknown as Event,
//   );
// }
