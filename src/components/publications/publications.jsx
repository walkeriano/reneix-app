import styles from "./publications.module.css";
import UsersActions from "../usersActions/usersActions";
import FormLocker from "../formLocker/formLocker";
import Image from "next/image";

export default function Publications() {
  return (
    <section className={styles.containerPublications}>
      <UsersActions />
      <FormLocker />
    </section>
  );
}
