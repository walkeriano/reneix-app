"use client";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import AuthContext from "@/state/auth/auth-context";

export default function useUserPlanning() {
  const { user } = useContext(AuthContext);
  const [planning, setPlanning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlanning(null);
      setLoading(false);
      return;
    }

    const getPlanning = async () => {
      try {
        setLoading(true);
        setError(null);

        const planningQuery = query(
          collection(db, "planning"),
          where("usuariosIds", "array-contains", user.uid),
        );

        const snapshot = await getDocs(planningQuery);

        if (snapshot.empty) {
          setPlanning(null);
          return;
        }

        // Si un usuario solo puede pertenecer a un planning,
        // tomamos el primero.
        const planningDoc = snapshot.docs[0];

        setPlanning({
          id: planningDoc.id,
          ...planningDoc.data(),
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPlanning();
  }, [user]);

  return {
    planning,
    loading,
    error,
  };
}
