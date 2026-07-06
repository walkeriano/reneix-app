"use client";

import { useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

import { db, auth } from "../../firebase-config";

export function useLocker() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLocker = async (data, selectedUsers) => {
    try {
      setLoading(true);
      setError(null);

      // Crear publicación
      const docRef = await addDoc(collection(db, "locker"), {
        ...data,
        userId: auth.currentUser?.uid || null,
        createdAt: serverTimestamp(),
      });

      // Guardar destinatarios
      await Promise.all(
        selectedUsers.map((user) =>
          setDoc(doc(db, "locker", docRef.id, "usuarios", user.id), {
            permitido: true,
            nombreUsuario: user.nombreUsuario,
            email: user.email,
            imagenPerfil: user.imagenPerfil || null,
            assignedAt: serverTimestamp(),
          }),
        ),
      );

      return {
        success: true,
        id: docRef.id,
      };
    } catch (err) {
      console.error(err);

      setError(err.message || "Ocurrió un error al crear la publicación");

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
