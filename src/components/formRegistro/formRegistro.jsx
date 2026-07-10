import styles from "./formRegistro.module.css";
import React, { useState, useContext } from "react";
import AuthContext from "@/state/auth/auth-context";
import { useUsuarios } from "@/hooks/useUsuarios";
import Image from "next/image";
import GeneradorCodigo from "../generadorCodigo/generadorCodigo";

export default function FormRegistro() {
  const { register } = useContext(AuthContext);
  const { createUsuario, loading, error } = useUsuarios();

  const [formData, setFormData] = useState({
    nombreUsuario: "",
    ciudad: "",
    pais: "",
    direccion: "",
    postal: "",
    movil: "",
    imagenPerfil: "",
    codigoAcceso: "",
    linkVideollamada: "",
    email: "",
    password: "",
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

    try {
      // 1. Crear usuario en Firebase Auth

      const firebaseUser = await register(formData.email, formData.password);

      // 2. Crear documento en Firestore

      await createUsuario({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        nombreUsuario: formData.nombreUsuario,
        ciudad: formData.ciudad,
        pais: formData.pais,
        direccion: formData.direccion,
        postal: formData.postal,
        movil: formData.movil,
        imagenPerfil: formData.imagenPerfil,
        codigoAcceso: formData.codigoAcceso,
        linkVideollamada: formData.linkVideollamada,
      });

      // 3. Limpiar formulario

      setFormData({
        nombreUsuario: "",
        ciudad: "",
        pais: "",
        direccion: "",
        postal: "",
        movil: "",
        imagenPerfil: "",
        codigoAcceso: "",
        linkVideollamada: "",
        email: "",
        password: "",
      });

      console.log("Usuario registrado");
    } catch (err) {
      console.error(err);

      alert(err.message);
    }
  };

  return (
    <section className={styles.containerRegistro}>
      <section className={styles.titleBox}>
        <p>Registrar nuevo paciente</p>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </section>
      <form onSubmit={handleSubmit} className={styles.formRegistro}>
        <div className={styles.imgPerfil}>
          <Image
            src={formData.imagenPerfil || "/bg-perfil.png"}
            alt="img-perfil"
            fill={true}
            onError={(e) => {
              e.currentTarget.src = "/person.svg";
            }}
          />
        </div>
        <label>
          <input
            type="url"
            name="imagenPerfil"
            placeholder="URL de la foto de perfil..."
            value={formData.imagenPerfil}
            onChange={handleChange}
            required
          />
          <Image src="/person.svg" alt="img-perfil" width={20} height={20} />
        </label>
        <label htmlFor="">
          <input
            type="text"
            name="nombreUsuario"
            placeholder="Nombre paciente..."
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
          />
          <Image
            src="/users-icon.svg"
            alt="img-perfil"
            width={20}
            height={20}
          />
        </label>
        <label>
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad..."
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
          <Image src="/city-icon.svg" alt="img-perfil" width={20} height={20} />
        </label>
        <label>
          <input
            type="text"
            name="pais"
            placeholder="País..."
            value={formData.pais}
            onChange={handleChange}
            required
          />
          <Image
            src="/world-icon.svg"
            alt="img-perfil"
            width={20}
            height={20}
          />
        </label>
        <label>
          <input
            type="text"
            name="direccion"
            placeholder="Dirección..."
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <Image
            src="/direction-icon.svg"
            alt="img-perfil"
            width={21}
            height={21}
          />
        </label>
        <label>
          <input
            type="text"
            name="postal"
            placeholder="Código postal..."
            value={formData.postal}
            onChange={handleChange}
            required
          />
          <Image
            src="/direction-icon.svg"
            alt="img-perfil"
            width={21}
            height={21}
          />
        </label>
        <label>
          <input
            type="number"
            name="movil"
            placeholder="Móvil..."
            value={formData.movil}
            onChange={handleChange}
            required
          />
          <Image src="/call-icon.svg" alt="img-perfil" width={17} height={20} />
        </label>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico..."
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Image src="/mail-icon.svg" alt="img-perfil" width={18} height={20} />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña..."
            value={formData.password}
            onChange={handleChange}
            required
            readOnly
            minLength={6}
          />
          <Image src="/password.svg" alt="img-perfil" width={22} height={20} />
        </label>
        <section className={styles.generatorBox}>
          <label>
            <input
              type="text"
              value={formData.codigoAcceso}
              placeholder="Código de acceso..."
              readOnly
            />
          </label>
          <GeneradorCodigo
            nombreUsuario={formData.nombreUsuario}
            movil={formData.movil}
            onGenerar={(codigo) =>
              setFormData((prev) => ({
                ...prev,
                password: codigo,
                codigoAcceso: codigo,
              }))
            }
          />
        </section>
        <section className={styles.generatorBoxTwo}>
          <div className={styles.titleBox}>
            <Image src="/vid-icon.svg" width={55} height={55} alt="icon-menu" />
            <h3>Sesiones Virtuales</h3>
            <h4>Enlace de videollamada</h4>
          </div>
          <label>
            <input
              type="url"
              name="linkVideollamada"
              placeholder="Pegar Enlace..."
              value={formData.linkVideollamada}
              onChange={handleChange}
              required
            />
          </label>
        </section>
        <button className={styles.sendDatos} type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
          <Image src="/send.svg" width={20} height={20} alt="icon-menu" />
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </section>
  );
}
