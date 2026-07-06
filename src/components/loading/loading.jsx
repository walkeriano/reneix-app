import styles from "./loading.module.css";
import Image from "next/image";
export default function IntroLoader() {
  return (
    <section className={styles.containerLoader}>
      <Image src="/logo-re.png" width={160} height={160} alt="logo-fanixera" />
      <section className={styles.textBox}>
        <h3>Reneix Web App</h3>
        <h3>Todos los derechos reservados 2026@</h3>
      </section>
      <section className={styles.loaderBox}>
        <div className={styles.loader}></div>
        <h4>Procesando...</h4>
      </section>
    </section>
  );
}
