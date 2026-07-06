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

  const savePlans = async (plans, selectedUsers) => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all(
        plans.map(async (plan) => {
          // Crear la sesión
          const docRef = await addDoc(
            collection(db, "planning"),
            {
              ...plan,
              status: "scheduled",
              createdAt: serverTimestamp(),
            }
          );

          // Guardar los usuarios asignados
          await Promise.all(
            selectedUsers.map((user) =>
              setDoc(
                doc(
                  db,
                  "planning",
                  docRef.id,
                  "usuarios",
                  user.id
                ),
                {
                  permitido: true,
                  nombreUsuario: user.nombreUsuario,
                  email: user.email,
                  imagenPerfil: user.imagenPerfil || null,
                  assignedAt: serverTimestamp(),
                }
              )
            )
          );
        })
      );

      return {
        success: true,
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