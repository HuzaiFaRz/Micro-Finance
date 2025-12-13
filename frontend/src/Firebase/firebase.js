import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_M_FINANCE_API_KEY,
  authDomain: import.meta.env.VITE_M_FINANCE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_M_FINANCE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_M_FINANCE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_M_FINANCE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_M_FINANCE_APP_ID,
  measurementId: import.meta.env.VITE_M_FINANCE_MEASUREMENT_ID,
};
console.log(firebaseConfig)
export const app = initializeApp(firebaseConfig);
console.log(import.meta.env);
