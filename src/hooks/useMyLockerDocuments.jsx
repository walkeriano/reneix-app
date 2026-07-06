"use client";

import { useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

import AuthContext from "@/state/auth/auth-context";
import { db } from "../../firebase-config";

export function useMyLockerDocuments() {
  const { user } = useContext(AuthContext);

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDocuments([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "locker"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        try {
          const docs = await Promise.all(
            snapshot.docs.map(async (lockerDoc) => {
              const permissionRef = doc(
                db,
                "locker",
                lockerDoc.id,
                "usuarios",
                user.uid
              );

              const permissionSnap = await getDoc(permissionRef);

              if (!permissionSnap.exists()) {
                return null;
              }

              return {
                id: lockerDoc.id,
                ...lockerDoc.data(),
              };
            })
          );

          setDocuments(docs.filter(Boolean));
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError(err.message);
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return {
    documents,
    loading,
    error,
  };
}