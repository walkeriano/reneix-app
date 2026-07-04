import styles from "./registroControl.module.css";
import Image from "next/image";

export default function RegistroControl({
  activeSectionTwo,
  setActiveSectionTwo,
}) {
  return (
    <section className={styles.houseBox}>
      <div
        className={`${styles.titleBox} ${
          activeSectionTwo === "registro" ? styles.active : ""
        }`}
        onClick={() => setActiveSectionTwo("registro")}
      >
        <h3>Registrador</h3>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </div>
      <div
        className={`${styles.titleBox} ${
          activeSectionTwo === "historyUsers" ? styles.active : ""
        }`}
        onClick={() => setActiveSectionTwo("historyUsers")}
      >
        <h3>Historial</h3>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </div>
    </section>
  );
}
