import styles from "./usersActuals.module.css";
import Image from "next/image";
import { useUsers } from "@/hooks/useUsers";

export default function UsersActuals() {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Cargando usuarios...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!users.length) return <p>No hay usuarios registrados</p>;

  return (
    <section className={styles.containerUsers}>
      <section className={styles.titleBox}>
        <p>Pacientes registrados</p>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </section>
      <section className={styles.listUsers}>
        {users.map((user) => (
          <section key={user.id} className={styles.itemUser}>
            <div className={styles.imgPerfil}>
              <Image src={user.imagenPerfil || "/image-angels.png"} fill={true} alt="Mentoria Image" />
            </div>
            <div className={styles.infoUser}>
              <h3>{user.nombreUsuario}</h3>
              <p>{user.email}</p>
            </div>
          </section>
        ))}
      </section>
    </section>
  );
}
