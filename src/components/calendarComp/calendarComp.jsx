"use client";
import styles from "./calendarComp.module.css";
import Image from "next/image";
import React, { useState, useContext } from "react";
import AuthContext from "@/state/auth/auth-context";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import usePlanning from "../../hooks/usePlanning";
import Header from "../header/header";
import NavDash from "../navDash/navDash";
import UsersActions from "../usersActions/usersActions";

export default function AdminCalendar() {
  const { user } = useContext(AuthContext);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [title, setTitle] = useState("");
  const { savePlans, loading } = usePlanning();

  const handleSelect = (selectInfo) => {
    console.log("📅 Selección detectada:", selectInfo);

    const newRange = {
      title: title || "Sesión",
      startDate: selectInfo.start.toISOString(),
      endDate: selectInfo.end.toISOString(),
    };

    console.log("➕ Nuevo rango generado:", newRange);

    setSelectedRanges((prev) => {
      const updated = [...prev, newRange];
      console.log("📦 Estado actualizado selectedRanges:", updated);
      return updated;
    });
  };

  const handleSave = async () => {
    console.log("🚀 Click en guardar");

    console.log("📦 selectedRanges actual:", selectedRanges);

    if (selectedRanges.length === 0) {
      console.warn("⚠️ No hay rangos para guardar");
      return;
    }

    try {
      console.log("⏳ Llamando savePlans...");
      await savePlans(selectedRanges);
      console.log("✅ savePlans completado");

      setSelectedRanges([]);
      console.log("🧹 Estado limpiado");
    } catch (error) {
      console.error("❌ Error en handleSave:", error);
    }
  };

  return (
    <section className={styles.bgDashboard}>
      <Header user={user} />
      <section className={styles.boxName}>
        <h2>Hola Angels</h2>
        <p>¿Qué haremos hoy?</p>
      </section>
      <NavDash />
      <span></span>
      <UsersActions />
      <section className={styles.titleSection}>
        <p>Registrar fecha de sesiones</p>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </section>
      <div className={styles.adminCalendar}>
        <label>
          <input
            type="text"
            placeholder="Nombre de la sesión"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <section className={styles.containerCalendar}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            selectMirror={true}
            select={handleSelect}
            editable={true}
          />
        </section>

        <button
          onClick={handleSave}
          disabled={loading}
          className={styles.sendDatos}
        >
          {loading ? "Guardando..." : "Guardar sesiones"}
          <Image src="/send.svg" width={20} height={20} alt="icon-menu" />
        </button>
      </div>
    </section>
  );
}
