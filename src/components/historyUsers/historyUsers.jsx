import React, { useState } from "react";
import styles from "./historyUsers.module.css";
import Image from "next/image";
import { useUsers } from "@/hooks/useUsers";

export default function HistoryUsers() {
  const { users, loading, error } = useUsers();
  const [copiedId, setCopiedId] = useState(null);

  const copyCode = async (codigo, userId) => {
    try {
      await navigator.clipboard.writeText(codigo);

      setCopiedId(userId);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!users.length) return <p>No hay usuarios registrados</p>;

  return (
    <section className={styles.allHistoryUsers}>
      <section className={styles.titleSectionOne}>
        <p>Usuario Publicados</p>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </section>
      <section className={styles.listUsers}>
        {users.map((user) => (
          <section key={user.id} className={styles.cardUsers}>
            <section className={styles.imgSection}>
              <Image
                src={user.imagenPerfil || "/image-angels.png"}
                alt="image-perfil"
                fill={true}
              />
            </section>
            <section className={styles.infoCard}>
              <section className={styles.nameCard}>
                <h3>{user.nombreUsuario}</h3>
                <section className={styles.flexButtons}>
                  <div className={styles.flexNameCard}>
                    <h4>Credencial</h4>
                    <p>{user.codigoAcceso}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyCode(user.codigoAcceso, user.id)}
                  >
                    {copiedId === user.id ? (
                      <Image
                        src="/ready-copy.svg"
                        width={22}
                        height={16}
                        alt="copiar codigo"
                      />
                    ) : (
                      <Image
                        src="/copy.svg"
                        width={22}
                        height={16}
                        alt="copiar codigo"
                      />
                    )}
                  </button>
                </section>
                <p>{user.email}</p>
                <p>{user.movil}</p>
                <p>{user.direccion}</p>
                <p>{user.ciudad}</p>
                <p>{user.pais}</p>
                <p>{user.postal}</p>
              </section>
              <button className={styles.btnDelete}>Desactivar</button>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}
