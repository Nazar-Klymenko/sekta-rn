import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize the app only if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp();
}

export const createUser = functions.https.onCall(async (data) => {
  const { email, password, username, agreeTos, agreeEmail } = data;

  if (!email || !password || !username || agreeTos === undefined) {
    throw new functions.https.HttpsError("invalid-argument", "Missing fields");
  }

  let userRecord: admin.auth.UserRecord | undefined;

  try {
    // Step 1: Create Authentication user
    userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Step 2: Attempt to create Firestore document
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      email,
      username,
      agreeTos,
      agreeEmail,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, uid: userRecord.uid };
  } catch (error) {
    console.error("Error in user creation process:", error);

    // If we've created an Auth user but Firestore failed, delete the Auth user
    if (userRecord) {
      try {
        await admin.auth().deleteUser(userRecord.uid);
      } catch (deleteError) {
        const errorMessage =
          deleteError instanceof Error ? deleteError.message : "Unknown error";
        console.error(
          "Error deleting Authentication user after Firestore failure:",
          errorMessage,
        );

        // Log the user ID for manual cleanup
        functions.logger.error("User requiring manual cleanup", {
          userId: userRecord.uid,
          email: email,
          error: errorMessage,
          timestamp: new Date().toISOString(),
        });
      }
    }

    throw new functions.https.HttpsError("internal", "Error creating user");
  }
});
