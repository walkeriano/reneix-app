import React, { useState, useContext } from "react";
import AuthContext from "@/state/auth/auth-context";
import styles from "./dashboardActions.module.css";
import Header from "../header/header";
import NavDash from "../navDash/navDash";
import Publications from "../publications/publications";
import LockerControl from "../lockerControl/lockerControl";
import HistorialPublications from "../historialPublications/historialPublications";

export default function DashboardActions() {
  const { user } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("publications");

  return (
    <section className={styles.bgDashboard}>
      <Header user={user} />
      <section className={styles.boxName}>
        <h2>Hola Angels</h2>
        <p>¿Qué haremos hoy?</p>
      </section>
      <NavDash />
      <LockerControl
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {activeSection === "publications" && <Publications />}
      {activeSection === "history" && <HistorialPublications />}
    </section>
  );
}
