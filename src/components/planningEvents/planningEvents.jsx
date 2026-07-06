import styles from "./planningEvents.module.css";
import usePlanningList from "@/hooks/usePlanningList";
import Image from "next/image";

export default function PlanningEvents() {
  const { plans, loading, error } = usePlanningList();

  if (loading) return <p>Cargando sesiones...</p>;

  if (error) return <p>Error al cargar las sesiones.</p>;

  if (plans.length === 0) {
    return <p>No existen sesiones registradas.</p>;
  }

  return (
    <section className={styles.planningEvents}>
      {plans.map((plan) => (
        <article className={styles.planDetail} key={plan.id}>
          <section className={styles.planTitle}>
            <p>Nombre Sesión</p>
            <h3>{plan.title}</h3>
          </section>
          <section className={styles.planPatients}>
            <p>Pacientes Vinculados</p>
            <section className={styles.planPatientsList}>
              <div className={styles.planItem}>
                <Image
                  src="/image-angels.png"
                  alt="Paciente 1"
                  width={65}
                  height={65}
                />
                <div className={styles.planItemInfo}>
                  <h4>Nombre paciente</h4>
                  <p>Correo paciente</p>
                </div>
              </div>
              <div className={styles.planItem}>
                <Image
                  src="/image-angels.png"
                  alt="Paciente 1"
                  width={65}
                  height={65}
                />
                <div className={styles.planItemInfo}>
                  <h4>Nombre paciente</h4>
                  <p>Correo paciente</p>
                </div>
              </div>
              <div className={styles.planItem}>
                <Image
                  src="/image-angels.png"
                  alt="Paciente 1"
                  width={65}
                  height={65}
                />
                <div className={styles.planItemInfo}>
                  <h4>Nombre paciente</h4>
                  <p>Correo paciente</p>
                </div>
              </div>
            </section>
          </section>
          <section className={styles.planDates}>
            <div className={styles.planInfo}>
              <h4>Inicio:</h4>
              <p>{new Date(plan.startDate).toLocaleString()}</p>
            </div>
            <div className={styles.planInfo}>
              <h4>Final:</h4>
              <p>{new Date(plan.endDate).toLocaleString()}</p>
            </div>
          </section>
        </article>
      ))}
    </section>
  );
}
