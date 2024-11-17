import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const updateUsername = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated."
    );
  }

  const { username } = data;
  const uid = context.auth.uid;

  if (!username || typeof username !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Username is required and must be a string"
    );
  }

  const db = admin.firestore();

  try {
    // Check if the username is already taken
    const usersSnapshot = await db
      .collection("users")
      .where("username", "==", username.toLowerCase())
      .limit(1)
      .get();

    if (!usersSnapshot.empty && usersSnapshot.docs[0].id !== uid) {
      throw new functions.https.HttpsError(
        "already-exists",
        "Username is already taken"
      );
    }

    // Update the user's username
    await db.doc(`users/${uid}`).update({
      username: username.toLowerCase(),
    });

    return { success: true, message: "Username updated successfully" };
  } catch (error) {
    console.error("Error updating username:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      "Failed to update username",
      error
    );
  }
});
