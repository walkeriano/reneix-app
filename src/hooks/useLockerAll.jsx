"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config.js";

export default function useLockerAll() {
  const [lockerData, setLockerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocker = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "locker")
        );

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLockerData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getLocker();
  }, []);

  return {
    lockerData,
    loading,
    error,
  };
}