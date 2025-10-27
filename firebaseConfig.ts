// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "firebase/app";
// import {
//   getReactNativePersistence,
//   initializeAuth,
//   signInWithPhoneNumber
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDS_TqlhnFR6IJI5_wOcwqHI4w5Npwk5Zk",
//   authDomain: "yatraq-475905.firebaseapp.com",
//   projectId: "yatraq-475905",
//   storageBucket: "yatraq-475905.firebasestorage.app",
//   messagingSenderId: "571242594617",
//   appId: "1:571242594617:android:3866caa0f140d25a6468e8",
// };
// // ✅ Initialize app safely (avoid double init)
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
//   experimentalForceWebRecaptcha: true, // ✅ free v2 reCAPTCHA (no billing)
// });

// // Configure auth with AsyncStorage persistence
// // const auth = getAuth(app);
// auth.persistence = getReactNativePersistence(AsyncStorage);

// export { auth, signInWithPhoneNumber };

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth, signInWithPhoneNumber } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDS_TqlhnFR6IJI5_wOcwqHI4w5Npwk5Zk",
  authDomain: "yatraq-475905.firebaseapp.com",
  projectId: "yatraq-475905",
  storageBucket: "yatraq-475905.firebasestorage.app",
  messagingSenderId: "571242594617",
  appId: "1:571242594617:android:3866caa0f140d25a6468e8",
};

// const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// ✅ Optional: disable reCAPTCHA billing stuff
// auth.appVerificationDisabledForTesting = true;

export { auth, signInWithPhoneNumber };

