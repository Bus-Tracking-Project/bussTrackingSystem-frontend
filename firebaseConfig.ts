import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth
} from "firebase/auth/react-native";


// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDS_TqlhnFR6IJI5_wOcwqHI4w5Npwk5Zk",
  authDomain: "yatraq-475905.firebaseapp.com",
  projectId: "yatraq-475905",
  storageBucket: "yatraq-475905.firebasestorage.app",
  messagingSenderId: "571242594617",
  appId: "1:571242594617:android:3866caa0f140d25a6468e8",
};

// ✅ Initialize only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };

