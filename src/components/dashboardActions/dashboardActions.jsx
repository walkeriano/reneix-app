import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    // Usuario no autenticado
    if (!user) {
      router.replace("/sesion-usuario");
      return;
    }

    // Usuario autenticado pero no es administrador
    if (user.userType !== "admin") {
      router.replace("/");
      return;
    }

    // Si llega hasta aquí, es admin y puede permanecer en la página.
  }, [user, router]);

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
