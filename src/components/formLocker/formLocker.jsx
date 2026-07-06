import styles from "./formLocker.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { useLocker } from "@/hooks/useLocker";

export default function FormLocker({
  selectedUsers,
  setSelectedUsers,
}) {
  const { createLocker, loading, error } = useLocker();

  const [formData, setFormData] = useState({
    url: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUsers.length) {
      alert("Selecciona al menos un usuario.");
      return;
    }

    const result = await createLocker(formData, selectedUsers);

    if (result.success) {
      setFormData({
        url: "",
        mensaje: "",
      });
      setSelectedUsers([]);
      console.log("Publicación creada");
    }
  };

  return (
    <section className={styles.containerForm}>
      <section className={styles.titleBox}>
        <p>Datos de publicación</p>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </section>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <label htmlFor="">
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="Link Archivo..."
          />
          <Image src="/link.svg" width={22} height={22} alt="icon-menu" />
        </label>
        <label htmlFor="">
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            placeholder="Redactar mensaje..."
          />
          <Image src="/message.svg" alt="img-perfil" width={20} height={20} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Publicar"}
          <Image src="/send.svg" width={20} height={20} alt="icon-menu" />
        </button>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
}
