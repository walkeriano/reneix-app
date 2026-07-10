import styles from "./usersActions.module.css";
import Image from "next/image";
import { useUsers } from "@/hooks/useUsers";

export default function UsersActions({ selectedUsers, onToggleUser }) {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Cargando usuarios...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!users.length) return <p>No hay usuarios registrados</p>;

  return (
    <section className={styles.usersContainer}>
      <section className={styles.titleSection}>
        <p>Usuarios destinatarios</p>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </section>
      <section className={styles.listUsers}>
        {users.map((user) => {
          const checked = selectedUsers.some((item) => item.id === user.id);
          return (
            <section key={user.id} className={styles.itemUser}>
              <div className={styles.imgPerfil}>
                <Image
                  src={user.imagenPerfil || "/image-angels.png"}
                  fill
                  alt="Mentoria Image"
                />
              </div>

              <div className={styles.infoUser}>
                <h3>{user.nombreUsuario}</h3>
                <p>{user.email}</p>
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleUser(user)}
              />
            </section>
          );
        })}
      </section>
    </section>
  );
}
