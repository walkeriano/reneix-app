import styles from "./lockerContent.module.css";
import Image from "next/image";
import { useLockerDocuments } from "@/hooks/useLockerDocuments";
import LoadingApp from "@/components/loadingApp/loadingApp";

export default function LockerContent({ setView }) {
  const { documents, loading, error } = useLockerDocuments();

  if (loading) {
    return <section className={styles.boxVacio}>
        <LoadingApp/>
        <p>Cargando...</p>
      </section>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!documents.length) {
    return (
      <section className={styles.boxVacio}>
        <Image
            src="/vacio.svg"
            width={70}
            height={70}
            alt="Video Icon"
          />
        <p>No hay publicaciones disponibles.</p>
      </section>
    );
  }

  return (
    <section className={styles.lockerContent}>
      <section className={styles.titleSection}>
        <div className={styles.textBox}>
          <Image
            src="/locker-img.png"
            width={25}
            height={23}
            alt="Video Icon"
          />
          <p>Locker</p>
        </div>
        <div onClick={() => setView("buttons")} className={styles.textCheck}>
          <Image
            src="/out.svg"
            width={20}
            height={17}
            alt="Video Icon"
          />
          <p>Volver</p>
        </div>
      </section>
      {documents.map((doc) => (
        <section key={doc.id} className={styles.listItemsLocker}>
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
            <p>{doc.mensaje}</p>
          </section>
          <section className={styles.buttonsLocker}>
            <a href={doc.url} target="_blank" rel="noopner noreferrer">
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
      <div className={styles.boxing}></div>
    </section>
  );
}
