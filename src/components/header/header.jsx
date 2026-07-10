import styles from "./header.module.css";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import Image from "next/image";
import Link from "next/link";

export default function Header({ user }) {
  const { logout } = useContext(AuthContext);
  const [showClosing, setShowClosing] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/sesion-usuario");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.headerContainer}>
      <Link href="/" className={styles.logoContainer}>
        <Image src="/logo-header.png" fill={true} alt="logo-fanixera" />
      </Link>
      <section className={styles.navContainer}>
        <button>
          <Image
            src={user?.imagenPerfil || "/users-icon.svg"}
            width={50}
            height={50}
            alt="icon-menu"
          />
        </button>
        <button onClick={() => setShowClosing(true)}>
          <Image src="/off.svg" width={20} height={20} alt="icon-menu" />
        </button>
        {showClosing && (
          <section className={styles.containerClosing}>
            <h3>¿Seguro qué deseas cerrar sesión?</h3>
            <div
              className={styles.btnClosing}
              onClick={() => setShowClosing(false)}
            >
              Volver
            </div>
            <div className={styles.btnClosing} onClick={handleLogout}>
              Cerrar sesión
            </div>
          </section>
        )}
      </section>
    </section>
  );
}
