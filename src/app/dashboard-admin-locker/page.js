"use client";
import React from "react";
import styles from "./page.module.css";
import DashboardActions from "@/components/dashboardActions/dashboardActions";

export default function DashboardAdminLocker() {

  return (
    <main className={styles.main}>
      <DashboardActions />
    </main>
  );
}
