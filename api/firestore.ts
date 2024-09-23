import {
  EmailAuthProvider,
  User,
  signOut as firebaseSignOut,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

import { UserData } from "@/models/UserData";
import { auth, db } from "@/services/firebase";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  } else {
    throw new Error("User not found");
  }
};
export const queryUserByUsername = async (username: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1),
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

export const updateUserProfile = async (
  user: User,
  profileData: Partial<UserData>,
  currentPassword?: string,
): Promise<{ message: string }> => {
  const updates: Partial<UserData> = { ...profileData };

  if (profileData.email && profileData.email !== user.email) {
    if (!currentPassword) {
      throw new Error("Current password is required to change email");
    }

    // Re-authenticate user
    const credential = EmailAuthProvider.credential(
      user.email!,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);

    // Send verification email to the new address
    await verifyBeforeUpdateEmail(user, profileData.email);
    await firebaseSignOut(auth);
    delete updates.email; // Remove email from Firestore updates
    return {
      message:
        "Verification email sent to new address. Please verify before logging in again.",
    };
  }

  if (Object.keys(updates).length > 0) {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, updates);
  }

  return { message: "Profile updated successfully" };
};
