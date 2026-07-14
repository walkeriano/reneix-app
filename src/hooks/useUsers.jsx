"use client";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase-config";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "usuarios"), orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUsers(data);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const toggleVerified = async (id, verified) => {
    try {
      await updateDoc(doc(db, "usuarios", id), {
        verified: !verified,
      });
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    toggleVerified,
    deleteUser,
  };
}
