"use client";

import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../../firebase-config";

export function useUsuarios() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUsuario = async ({
    uid,
    email,
    nombreUsuario,
    ciudad,
    pais,
    direccion,
    postal,
    movil,
    imagenPerfil,
    codigoAcceso,
    linkVideollamada,
    userType = "client",
  }) => {
    try {
      setLoading(true);
      setError(null);

      const userData = {
        uid,
        email,
        nombreUsuario,
        ciudad,
        pais,
        direccion,
        postal,
        movil,
        imagenPerfil,
        codigoAcceso,
        linkVideollamada,
        userType,
        verified: false,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "usuarios", uid), userData);

      return {
        success: true,
        data: userData,
      };
    } catch (err) {
      console.error(err);

      setError(err.message);

      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    createUsuario,
    loading,
    error,
  };
}
