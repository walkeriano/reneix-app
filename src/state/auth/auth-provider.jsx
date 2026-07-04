"use client";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebase-config";
import Loading from "@/components/loading/loading";
import { serverTimestamp } from "firebase/firestore";

const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Este email no es válido";
    case "auth/user-disabled":
      return "Cuenta de usuario desconocida";
    case "auth/user-not-found":
      return "No se encontró una cuenta disponible";
    case "auth/wrong-password":
      return "La contraseña es incorrecta";
    case "auth/email-already-in-use":
      return "Este Email ya está en uso";
    case "auth/weak-password":
      return "La contraseña debe tener mínimo 6 caracteres";
    default:
      return "Credenciales incorrectas";
  }
};

const handleFirebaseError = (error) => {
  console.error("Firebase error:", error);
  return getFirebaseErrorMessage(error);
};

const USER_CACHE_KEY = "app_user";

const saveUserCache = (user) => {
  localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
};

const getUserCache = () => {
  try {
    const cached = localStorage.getItem(USER_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const clearUserCache = () => {
  localStorage.removeItem(USER_CACHE_KEY);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      return getUserCache();
    }
    return null;
  });

  const [loading, setLoading] = useState(true);
  const [loadingUserData, setLoadingUserData] = useState(false); // Para Firestore

  const isLoading = loading || loadingUserData;

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Usuario autenticado:", firebaseUser);

      if (!firebaseUser) {
        setUser(null);
        clearUserCache();
        setLoading(false);
        return;
      }

      // 🔥 Si ya tenemos cache válido → no consultamos Firestore
      const cachedUser = getUserCache();
      if (cachedUser?.uid === firebaseUser.uid) {
        console.log("✅ Usando usuario desde cache");
        setUser(cachedUser);
        setLoading(false);
        return;
      }

      // ❗ Si no hay cache → consultamos Firestore
      console.log("🔥 Consultando usuario en Firestore");
      setLoadingUserData(true);

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        const userData = userSnap.exists()
          ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userSnap.data(),
            }
          : {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              verified: false,
            };

        setUser(userData);
        saveUserCache(userData); // 💾 Guardamos cache
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoadingUserData(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const markUserAsVerified = async () => {
    if (!user?.uid) return;

    const userRef = doc(db, "users", user.uid);

    await setDoc(userRef, { verified: true }, { merge: true });

    const updatedUser = {
      ...user,
      verified: true,
    };

    setUser(updatedUser);
    saveUserCache(updatedUser);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      let userData;

      if (userSnap.exists()) {
        userData = userSnap.data();
      } else {
        userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nombreUsuario: firebaseUser.displayName || "Usuario sin nombre",
          imageUrl: firebaseUser.photoURL || "/default-avatar.png",
          userType: "client",
          verified: false,
          createdAt: serverTimestamp(),
          cel: firebaseUser.phoneNumber || null,
        };

        await setDoc(userRef, userData);
      }

      setUser(userData);
      saveUserCache(userData);
      return userData; // ⬅️ Importante: ahora devuelve el resultado
    } catch (error) {
      console.error("Error en login con Google:", error.message);
      throw new Error("No se pudo iniciar sesión con Google.");
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      setLoadingUserData(true);
      try {
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = {
            uid: user.uid,
            email: user.email,
            ...userSnap.data(),
          };
          setUser(userData);
          saveUserCache(userData);
          return userData; // ✅ ahora sí retorna datos útiles
        }
      } catch (error) {
        console.error("Error al obtener datos de usuario:", error);
      } finally {
        setLoadingUserData(false);
      }

      return null; // si no existe en Firestore
    } catch (error) {
      setLoadingUserData(false);
      throw new Error(handleFirebaseError(error));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      clearUserCache(); // 🧹
    } catch (error) {
      throw new Error("Error durante el cierre de sesión.");
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return userCredential.user;
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        loginWithGoogle,
        logout,
        loadingUserData,
        markUserAsVerified,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
