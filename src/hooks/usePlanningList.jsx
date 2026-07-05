import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase-config";

export default function usePlanningList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPlans = async () => {
    try {
      setLoading(true);

      const planningRef = collection(db, "planning");

      const q = query(planningRef, orderBy("startDate", "asc"));

      const snapshot = await getDocs(q);

      const planning = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPlans(planning);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    refreshPlans: getPlans,
  };
}