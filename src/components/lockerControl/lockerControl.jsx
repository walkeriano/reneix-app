import styles from "./lockerControl.module.css";
import Image from "next/image";

export default function LockerControl({ activeSection, setActiveSection }) {
  return (
    <section className={styles.houseBox}>
      <div
        className={`${styles.titleBox} ${
          activeSection === "publications" ? styles.active : ""
        }`}
        onClick={() => setActiveSection("publications")}
      >
        <h3>Creador</h3>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </div>
      <div
        className={`${styles.titleBox} ${
          activeSection === "history" ? styles.active : ""
        }`}
        onClick={() => setActiveSection("history")}
      >
        <h3>Historial</h3>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </div>
    </section>
  );
}
