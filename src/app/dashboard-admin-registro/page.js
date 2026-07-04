"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import RegistroActions from "@/components/registroActions/registroActions";
export default function DashboardAdminRegistro() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.main}>
      <RegistroActions />
    </main>
  );
}
