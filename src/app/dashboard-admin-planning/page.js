"use client";
import React from "react";
import styles from "./page.module.css";
import DashboardActions from "@/components/dashboardActions/dashboardActions";
import CalendarComp from "@/components/calendarComp/calendarComp"

export default function DashboardAdminPlanning() {

  return (
    <main className={styles.main}>
      <CalendarComp />
    </main>
  );
}
