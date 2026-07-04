import { useState } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function usePlanning() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const savePlans = async (plans) => {
  console.log("🔥 savePlans recibido:", plans);

  setLoading(true);

  try {
    const promises = plans.map((plan, index) => {
      console.log(`📤 Guardando plan ${index + 1}:`, plan);

      return addDoc(collection(db, "planning"), {
        ...plan,
        status: "scheduled",
        createdAt: serverTimestamp(),
      });
    });

    const result = await Promise.all(promises);

    console.log("✅ Firestore response:", result);

  } catch (err) {
    console.error("❌ Error en Firestore:", err);
  } finally {
    setLoading(false);
    console.log("🔚 Loading terminado");
  }
};

  return { savePlans, loading, error };
}