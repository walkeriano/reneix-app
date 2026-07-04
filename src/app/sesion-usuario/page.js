"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Loading from "@/components/loading/loading";
import ControlAcces from "@/components/controlAcces/controlAcces";

export default function SesionUsuario() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.main}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ControlAcces />
        </>
      )}
    </main>
  );
}
