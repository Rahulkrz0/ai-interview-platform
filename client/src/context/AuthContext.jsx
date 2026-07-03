import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

// Create base axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api',
  withCredentials: true,
});

// Helper to format Firebase errors
const formatFirebaseError = (error) => {
  if (!error.code) {
    // Check for 429 from our backend
    if (error.response?.status === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    return error.message || 'Authentication failed. Please try again.';
  }

  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email already in use. Please log in or use a different email.';
    case 'auth/weak-password':
      return 'Weak password. The password must be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/network-request-failed':
      return 'Network error. Please verify your internet connection.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed attempts.';
    default:
      return error.message || 'Authentication error. Please try again.';
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('accessToken') || null);
  const [loading, setLoading] = useState(true);

  // Ref to track token for interceptors without causing re-subscriptions
  const tokenRef = useRef(token);
  useEffect(() => { tokenRef.current = token; }, [token]);

  // Flag to prevent onAuthStateChanged from making duplicate calls
  // after login/signup/googleLogin have already handled the backend sync
  const authActionInProgress = useRef(false);

  // Sync token to Axios interceptors — stable, no re-subscription on token change
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        const currentToken = tokenRef.current;
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Only log non-429 errors to reduce console noise
        if (error.response?.status !== 429) {
          console.error('[API Connection Failure]:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            responseData: error.response?.data,
            errorMessage: error.message
          });
        }

        const originalRequest = error.config;

        if (error.response?.status === 401 && error.response?.data?.status === 'expired' && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';
            const res = await axios.post(`${apiUrl}/auth/refresh`, {}, { withCredentials: true });
            const newAccessToken = res.data.accessToken;

            localStorage.setItem('accessToken', newAccessToken);
            setToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            await logoutInternal();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, []); // Stable — never re-subscribes

  // Internal logout helper (doesn't call signOut to avoid recursion)
  const logoutInternal = useCallback(() => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  }, []);

  // Session persistence on mount — runs ONCE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // If an explicit auth action (login/signup/googleLogin) is in progress,
      // skip — it will handle setting user/token itself
      if (authActionInProgress.current) {
        setLoading(false);
        return;
      }

      if (firebaseUser) {
        // Try to restore session from existing backend token
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken) {
          try {
            const res = await api.get('/auth/profile');
            setUser(res.data.user);
          } catch (err) {
            // Token expired or invalid — try to sync once
            try {
              const syncRes = await api.post('/auth/login', {
                email: firebaseUser.email,
                firebaseUid: firebaseUser.uid
              });
              localStorage.setItem('accessToken', syncRes.data.accessToken);
              setToken(syncRes.data.accessToken);
              setUser(syncRes.data.user);
            } catch (syncErr) {
              console.warn('Session sync failed, clearing state.');
              logoutInternal();
            }
          }
        } else {
          // No saved token — sync session with backend
          try {
            const syncRes = await api.post('/auth/login', {
              email: firebaseUser.email,
              firebaseUid: firebaseUser.uid
            });
            localStorage.setItem('accessToken', syncRes.data.accessToken);
            setToken(syncRes.data.accessToken);
            setUser(syncRes.data.user);
          } catch (syncErr) {
            console.warn('Session sync skipped.');
          }
        }
      } else {
        // No Firebase user — check if we have a local token
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken) {
          try {
            const res = await api.get('/auth/profile');
            setUser(res.data.user);
          } catch (err) {
            logoutInternal();
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Runs ONCE on mount — no token dependency

  const login = async (email, password) => {
    try {
      authActionInProgress.current = true;

      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Sync with backend — single call
      const res = await api.post('/auth/login', {
        email,
        firebaseUid: firebaseUser.uid
      });

      const { accessToken, user } = res.data;
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    } finally {
      // Small delay to ensure onAuthStateChanged doesn't race
      setTimeout(() => { authActionInProgress.current = false; }, 500);
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      authActionInProgress.current = true;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, { displayName: name });

      const res = await api.post('/auth/signup', {
        name,
        email,
        firebaseUid: firebaseUser.uid,
        role: role || 'student'
      });

      const { accessToken, user } = res.data;
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    } finally {
      setTimeout(() => { authActionInProgress.current = false; }, 500);
    }
  };

  const googleLogin = async () => {
    try {
      authActionInProgress.current = true;

      const userCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;

      const res = await api.post('/auth/google', {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photo: firebaseUser.photoURL,
        firebaseUid: firebaseUser.uid
      });

      const { accessToken, user } = res.data;
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    } finally {
      setTimeout(() => { authActionInProgress.current = false; }, 500);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  };

  const logout = async () => {
    try {
      authActionInProgress.current = true;
      await signOut(auth);
      await api.post('/auth/logout');
    } catch (e) {
      console.warn('Backend logout bypass.');
    } finally {
      logoutInternal();
      setTimeout(() => { authActionInProgress.current = false; }, 500);
    }
  };

  const updateUserProfile = async (updatedFields) => {
    const res = await api.put('/auth/profile', updatedFields);
    setUser(res.data.user);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, googleLogin, forgotPassword, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
