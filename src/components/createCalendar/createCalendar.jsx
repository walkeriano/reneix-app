import styles from "./createCalendar.module.css";
import React, { useState } from "react";
import UsersActions from "../usersActions/usersActions";
import Image from "next/image";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import usePlanning from "../../hooks/usePlanning";

export default function CreateCalendar() {
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");

  const { savePlans, loading } = usePlanning();

  const handleToggleUser = (user) => {
    setSelectedUsers((prev) => {
      const exists = prev.some((item) => item.id === user.id);

      if (exists) {
        return prev.filter((item) => item.id !== user.id);
      }

      return [...prev, user];
    });
  };

  const handleSelect = (selectInfo) => {
    const newRange = {
      title: title || "Sesión",
      startDate: selectInfo.start.toISOString(),
      endDate: selectInfo.end.toISOString(),
    };

    setSelectedRanges((prev) => [...prev, newRange]);
  };

  const handleSave = async () => {
    if (selectedRanges.length === 0) {
      alert("Debes seleccionar al menos una fecha.");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Debes seleccionar al menos un usuario.");
      return;
    }

    try {
      const result = await savePlans(selectedRanges, selectedUsers);

      if (result?.success) {
        setSelectedRanges([]);
        setSelectedUsers([]);
        setTitle("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.containerCreateCalendar}>
      <UsersActions
        selectedUsers={selectedUsers}
        onToggleUser={handleToggleUser}
      />

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
