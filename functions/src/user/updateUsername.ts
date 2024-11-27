import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

export const updateUsername = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated."
    );
  }

  const { username } = data;
  const uid = context.auth.uid;
  const lowercaseUsername = username.toLowerCase();

  if (!username || typeof username !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Username is required and must be a string"
    );
  }

  const db = admin.firestore();

  try {
    // Get the user's current username
    const userDoc = await db.collection("users").doc(uid).get();
    const currentUsername = userDoc.data()?.username;

    // Check if the new username is already taken
    const newUsernameDoc = await db
      .collection("usernames")
      .doc(lowercaseUsername)
      .get();
    if (newUsernameDoc.exists && newUsernameDoc.data()?.uid !== uid) {
      throw new functions.https.HttpsError(
        "already-exists",
        "Username is already taken"
      );
    }

    // Update both collections in a batch
    const batch = db.batch();

    // Update user document
    batch.update(db.collection("users").doc(uid), {
      username: lowercaseUsername,
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Delete old username document
    if (currentUsername) {
      batch.delete(db.collection("usernames").doc(currentUsername));
    }

    // Create new username document
    batch.set(db.collection("usernames").doc(lowercaseUsername), {
      uid,
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: currentUsername
        ? FieldValue.serverTimestamp()
        : userDoc.data()?.createdAt,
    });

    await batch.commit();

    return { success: true, message: "Username updated successfully" };
  } catch (error) {
    console.error("Error updating username:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      "Failed to update username"
    );
  }
});
