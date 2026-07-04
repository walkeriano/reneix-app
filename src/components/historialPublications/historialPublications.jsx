import styles from "./historialPublications.module.css";
import Image from "next/image";
import useLockerAll from "@/hooks/useLockerAll";

export default function HistorialPublications() {
  const { lockerData, loading, error } = useLockerAll();

  if (loading) {
    return <p>Cargando publicaciones...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className={styles.containerHistory}>
      <section className={styles.titleSectionOne}>
        <p>Publicaciones realizadas</p>
        <Image src="/arrow-bottom.svg" width={10} height={12} alt="icon-menu" />
      </section>
      <section className={styles.overContainer}>
        {lockerData.map((item) => (
          <section key={item.id} className={styles.listItemsLocker}>
            <section className={styles.headerItem}>
              <div className={styles.headerInfo}>
                <h3>Angels Córcoles</h3>
                <p>3:00 pm</p>
              </div>
              <div className={styles.headerImage}>
                <Image src="/image-angels.png" fill={true} alt="Locker Image" />
              </div>
            </section>
            <section className={styles.textLocker}>
              <p>{item.mensaje}</p>
            </section>
            <section className={styles.buttonsLocker}>
              <a href="/" target="_blank" rel="noopner noreferrer">
                <p>Abrir archivo</p>
                <Image
                  src="/clip.svg"
                  width={30}
                  height={20}
                  alt="Locker Image"
                />
              </a>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}
