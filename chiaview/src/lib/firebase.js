/**
 * Firebase Configuration
 * Initialize Firebase and export instances
 */

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.databaseURL &&
  firebaseConfig.projectId
);

let app = null;
let database = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase initialization failed:", error.message);
  }
}

// Export instances (will be null if not configured)
export { database, auth, isFirebaseConfigured };

/**
 * Database Helper Functions
 */

export async function saveToFirebase(path, data) {
  try {
    const { ref, set } = await import("firebase/database");
    await set(ref(database, path), data);
    return true;
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    return false;
  }
}

export async function loadFromFirebase(path) {
  try {
    const { ref, get } = await import("firebase/database");
    const snapshot = await get(ref(database, path));
    return snapshot.val();
  } catch (error) {
    console.error("Error loading from Firebase:", error);
    return null;
  }
}

export async function deleteFromFirebase(path) {
  try {
    const { ref, remove } = await import("firebase/database");
    await remove(ref(database, path));
    return true;
  } catch (error) {
    console.error("Error deleting from Firebase:", error);
    return false;
  }
}

export default app;
