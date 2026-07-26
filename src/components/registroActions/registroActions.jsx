import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import styles from "./registroActions.module.css";
import Header from "../header/header";
import NavDash from "../navDash/navDash";
import RegistradorUsers from "@/components/registradorUsers/registradorUsers";
import RegistroControl from "@/components/registroControl/registroControl";
import HistoryUsers from "@/components/historyUsers/historyUsers";

export default function RegistroActions() {
  const { user } = useContext(AuthContext);
  const [activeSectionTwo, setActiveSectionTwo] = useState("registro");
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
      <RegistroControl
        activeSectionTwo={activeSectionTwo}
        setActiveSectionTwo={setActiveSectionTwo}
      />
      {activeSectionTwo === "registro" && <RegistradorUsers />}
      {activeSectionTwo === "historyUsers" && <HistoryUsers />}
    </section>
  );
}
