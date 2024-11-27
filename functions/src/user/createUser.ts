import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

export const createUser = functions.https.onCall(async (data) => {
  const { email, password, username, agreeTos, agreeEmail } = data;

  if (!email || !password || !username || agreeTos === undefined) {
    throw new functions.https.HttpsError("invalid-argument", "Missing fields");
  }

  const lowercaseUsername = username.toLowerCase();
  let userRecord: admin.auth.UserRecord | undefined;
  const db = admin.firestore();

  try {
    // Check if the username is already taken using the usernames collection
    const usernameDoc = await db
      .collection("usernames")
      .doc(lowercaseUsername)
      .get();

    if (usernameDoc.exists) {
      throw new functions.https.HttpsError(
        "already-exists",
        "Username is already taken"
      );
    }

    userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    const batch = db.batch();

    const userRef = db.collection("users").doc(userRecord.uid);
    batch.set(userRef, {
      email,
      username: lowercaseUsername,
      agreeTos,
      agreeEmail,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Create the username document
    const usernameRef = db.collection("usernames").doc(lowercaseUsername);
    batch.set(usernameRef, {
      uid: userRecord.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    await batch.commit();

    return { success: true, uid: userRecord.uid };
  } catch (error) {
    console.error("Error in user creation process:", error);

    // If we've created an Auth user but the batch failed, delete everything
    if (userRecord) {
      try {
        await admin.auth().deleteUser(userRecord.uid);
      } catch (deleteError) {
        console.error(
          "Error deleting Authentication user after failure:",
          deleteError
        );
        functions.logger.error("User requiring manual cleanup", {
          userId: userRecord.uid,
          email: email,
          error:
            deleteError instanceof Error
              ? deleteError.message
              : "Unknown error",
          timestamp: new Date().toISOString(),
        });
      }
    }
    throw new functions.https.HttpsError("internal", "Error creating user");
  }
});
