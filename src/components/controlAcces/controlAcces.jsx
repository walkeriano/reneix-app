import styles from "./controlAcces.module.css";
import Image from "next/image";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";

export default function ControlAcces() {
  const { login } = useContext(AuthContext);

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const user = await login(formData.email, formData.password);

      if (user?.userType === "admin") {
        router.replace("/dashboard-admin-locker");
        return;
      }

      if (user?.userType === "client") {
        router.replace("/");
        return;
      }

      // Si por alguna razón no existe el tipo de usuario
      router.replace("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={styles.containerAcces}>
      <Image src="/logo-re.png" width={170} height={170} alt="logo-fanixera" />
      <section className={styles.titleSection}>
        <h2>Ingresar credenciales</h2>
        <div className={styles.logoShield}>
          <Image src="/shield.svg" width={15} height={17} alt="logo-fanixera" />
          <p>Portal protegido</p>
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Ingresar email..."
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Image
            src="/person-two.svg"
            alt="img-perfil"
            width={20}
            height={20}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Código acceso..."
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Image
            src="/password-two.svg"
            alt="img-perfil"
            width={22}
            height={22}
          />
        </label>
        <button type="submit" className={styles.sendDatos}>
          Acceder
          <Image src="/send-white.svg" width={20} height={20} alt="icon-menu" />
        </button>
        {error && (
          <section className={styles.errorBox}>
            <p className={styles.error}>{error}</p>
          </section>
        )}
      </form>
    </section>
  );
}
