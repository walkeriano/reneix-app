import styles from "./planningContent.module.css";
import Image from "next/image";
import Link from "next/link";
import getNextSession from "@/utils/getNextSession";

export default function PlanningContent({ setView, planning }) {
  const nextSession = getNextSession(
    planning?.selectedDays,
    planning?.sessionHour,
  );

  return (
    <section className={styles.lockerContent}>
      <section className={styles.titleSection}>
        <div className={styles.textBox}>
          <Image src="/calendar.svg" width={25} height={23} alt="Video Icon" />
          <p>Planning</p>
        </div>
        <div onClick={() => setView("buttons")} className={styles.textCheck}>
          <Image src="/out.svg" width={20} height={17} alt="Video Icon" />
          <p>Volver</p>
        </div>
      </section>
      <section className={styles.calendarSection}>
        {nextSession && (
          <section className={styles.nextCita}>
            <h2>{planning?.title}</h2>
            <p>
              {nextSession.date} a las {nextSession.hour} {nextSession.period}
            </p>
            <Link href={planning?.linkVideollamada}>Ir a la videollamada</Link>
          </section>
        )}
        <section className={styles.containerListDates}>
          <div>Lista de sesiones</div>
          <section className={styles.flexContainer}>
            {planning?.selectedDays?.map((day) => (
              <div key={day}>
                <p>{day}</p>
                <Image src="/calendar.svg" width={25} height={23} alt="Video Icon" />
              </div>
            ))}
          </section>
        </section>
      </section>
    </section>
  );
}
