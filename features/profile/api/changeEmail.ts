import {
  EmailAuthProvider,
  User,
  signOut as firebaseSignOut,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { UserData } from "@/shared/models/UserData";
import { auth, db } from "@/shared/services/firebase";

export const changeEmail = async (
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
