import admin from "firebase-admin";
import serviceAccount from "./clubee-9dc7b-firebase-adminsdk-o8qmj-8ed2637537.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    });
  } catch (error: any) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default admin.firestore();
