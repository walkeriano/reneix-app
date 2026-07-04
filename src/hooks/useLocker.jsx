"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase-config.js";

export function useLocker() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLocker = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const docRef = await addDoc(collection(db, "locker"), {
        ...data,
        userId: auth.currentUser?.uid || null,
        createdAt: serverTimestamp(),
      });

      return {
        success: true,
        id: docRef.id,
      };
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Ocurrió un error al crear el registro"
      );

      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    createLocker,
    loading,
    error,
  };
}