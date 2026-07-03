import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0i-pX8EBnRcMk4gXdjJ1ssEmaDE7pKQU",
  authDomain: "ai-interview-preparation-411b0.firebaseapp.com",
  projectId: "ai-interview-preparation-411b0",
  storageBucket: "ai-interview-preparation-411b0.firebasestorage.app",
  messagingSenderId: "864586713615",
  appId: "1:864586713615:web:6bf47458fbe7bc56b4f17a",
  measurementId: "G-K4HFPQ4BWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
