"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase-config";

export default function usePlanningList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPlans = async () => {
    try {
      setLoading(true);
      setError(null);

      const planningRef = collection(db, "planning");

      const q = query(
        planningRef,
        orderBy("startDate", "asc")
      );

      const snapshot = await getDocs(q);

      const planning = await Promise.all(
        snapshot.docs.map(async (planDoc) => {
          // Obtener usuarios de la subcolección
          const usersSnapshot = await getDocs(
            collection(
              db,
              "planning",
              planDoc.id,
              "usuarios"
            )
          );

          const usuarios = usersSnapshot.docs.map((userDoc) => ({
            id: userDoc.id,
            ...userDoc.data(),
          }));

          return {
            id: planDoc.id,
            ...planDoc.data(),
            usuarios,
          };
        })
      );

      setPlans(planning);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al obtener las sesiones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPlans();
  }, []);

  const deletePlan = async (id) => {
  try {
    await deleteDoc(doc(db, "planning", id));

    // Recargar la lista
    await getPlans();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

  return {
    plans,
    loading,
    error,
    refreshPlans: getPlans,
    deletePlan,
  };
}