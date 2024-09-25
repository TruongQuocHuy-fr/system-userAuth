// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARKBSO9NWgq7CUaOF9d_B_m-atyv4wYnw",
  authDomain: "qlnv-3fb6b.firebaseapp.com",
  projectId: "qlnv-3fb6b",
  storageBucket: "qlnv-3fb6b.appspot.com",
  messagingSenderId: "358330538372",
  appId: "1:358330538372:web:5269bfa1e842822b2925d1"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth với AsyncStorage để duy trì trạng thái đăng nhập
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Khởi tạo Firestore
const db = getFirestore(app);

export { auth, db };
