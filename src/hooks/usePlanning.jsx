"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../firebase-config";

export default function usePlanning() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const savePlans = async ({
    title,
    linkVideollamada,
    sessionHour,
    selectedDays,
    usuarios,
  }) => {
    try {
      setLoading(true);
      setError(null);

      // Array de IDs para consultas rápidas
      const usuariosIds = usuarios.map((user) => user.id);

      // Crear documento principal
      const docRef = await addDoc(collection(db, "planning"), {
        title,
        linkVideollamada,
        sessionHour,
        selectedDays,
        usuariosIds,
        status: "scheduled",
        createdAt: serverTimestamp(),
      });

      // Guardar información completa de cada usuario
      await Promise.all(
        usuarios.map((user) =>
          setDoc(
            doc(db, "planning", docRef.id, "usuarios", user.id),
            {
              uid: user.id,
              permitido: true,
              nombreUsuario: user.nombreUsuario,
              email: user.email,
              imagenPerfil: user.imagenPerfil || null,
              assignedAt: serverTimestamp(),
            }
          )
        )
      );

      return {
        success: true,
        planningId: docRef.id,
      };
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Error al guardar la planificación."
      );

      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    savePlans,
    loading,
    error,
  };
}