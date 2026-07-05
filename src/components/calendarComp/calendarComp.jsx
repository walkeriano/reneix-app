"use client";
import styles from "./calendarComp.module.css";
import React, { useState, useContext } from "react";
import AuthContext from "@/state/auth/auth-context";
import Header from "../header/header";
import NavDash from "../navDash/navDash";
import CreateCalendar from "../createCalendar/createCalendar";
import PlanningEvents from "../planningEvents/planningEvents";
import RegistroControl from "@/components/registroControl/registroControl";

export default function AdminCalendar() {
  const { user } = useContext(AuthContext);
  const [activeSectionTwo, setActiveSectionTwo] = useState("registro");

  return (
    <section className={styles.bgDashboard}>
      <Header user={user} />
      <section className={styles.boxName}>
        <h2>Hola Angels</h2>
        <p>¿Qué haremos hoy?</p>
      </section>
      <NavDash />
      <RegistroControl
        activeSectionTwo={activeSectionTwo}
        setActiveSectionTwo={setActiveSectionTwo}
      />
      {activeSectionTwo === "registro" && <CreateCalendar />}
      {activeSectionTwo === "historyUsers" && <PlanningEvents />}
    </section>
  );
}
