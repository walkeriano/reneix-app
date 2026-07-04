import styles from "./registradorUsers.module.css";
import FormRegistro from "@/components/formRegistro/formRegistro";
import UsersActuals from "@/components/usersActuals/usersActuals";

export default function RegistradorUsers() {
  return (
    <section className={styles.boxGeneral}>
      <UsersActuals />
      <FormRegistro />
    </section>
  );
}
