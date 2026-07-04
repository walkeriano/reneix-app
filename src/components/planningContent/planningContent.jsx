import styles from "./planningContent.module.css";
import Image from "next/image";
import CalendarComp from "@/components/calendarComp/calendarComp"

export default function PlanningContent({ setView }) {
  return (
    <section className={styles.lockerContent}>
      <section className={styles.titleSection}>
        <div className={styles.textBox}>
          <Image src="/calendar.svg" width={25} height={23} alt="Video Icon" />
          <p>Planning</p>
        </div>
        <div onClick={() => setView("buttons")} className={styles.textCheck}>
          <Image src="/out.svg" width={20} height={17} alt="Video Icon" />
          <p>Volver great</p>
        </div>
      </section>
      <CalendarComp/>
    </section>
  );
}
