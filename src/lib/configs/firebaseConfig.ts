import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
  throw new Error(
    "Missing NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET environment variable",
  );
}

const storageBucket: string = process.env
  .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
