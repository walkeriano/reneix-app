import styles from "./loading.module.css";
import Image from "next/image";
export default function IntroLoader() {
  return (
    <section className={styles.containerLoader}>
      <Image src="/logo-re.png" width={160} height={160} alt="logo-fanixera" />
      <h1>RENEIX@ - 2026</h1>
      <div className={styles.loader}></div>
    </section>
  );
}
