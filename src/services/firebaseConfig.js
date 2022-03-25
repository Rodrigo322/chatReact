import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCufqi6knwq_11LY0q9n_VkEboyrIdseVI",
  authDomain: "reactchat-9a511.firebaseapp.com",
  projectId: "reactchat-9a511",
  storageBucket: "reactchat-9a511.appspot.com",
  messagingSenderId: "842229152658",
  appId: "1:842229152658:web:9eb0416f72f38b867e1f4b",
  measurementId: "G-XREJL3ZVTJ",
};

export const app = initializeApp(firebaseConfig);
export const databaseApp = getFirestore(app);
