import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const storageBucket: string = process.env.FIREBASE_STORAGE_BUCKET! as string;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: storageBucket,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseConfig.storageBucket);

export { app, storage };
