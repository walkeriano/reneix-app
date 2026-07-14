import styles from "./planningEvents.module.css";
import usePlanningList from "@/hooks/usePlanningList";
import Image from "next/image";
import Link from "next/link";

export default function PlanningEvents() {
  const { plans, loading, error, deletePlan } = usePlanningList();

  if (loading) return <p>Cargando sesiones...</p>;

  if (error) return <p>Error al cargar las sesiones.</p>;

  if (plans.length === 0) {
    return <p>No existen sesiones registradas.</p>;
  }

  return (
    <section className={styles.planningEvents}>
      {plans.map((plan) => (
        <article className={styles.planDetail} key={plan.id}>
          <section className={styles.containerFlexPlan}>
            <section className={styles.planTitle}>
              <p>Nombre Sesión</p>
              <h3>{plan?.title}</h3>
            </section>
            <section className={styles.planTitle}>
              <p>Enlace Videollamada</p>
              <a href={plan.linkVideollamada} target="_blank">
                {plan?.linkVideollamada || "No hay enlace vinculado"}
              </a>
            </section>
            <section className={styles.planPatients}>
              <p>Pacientes Vinculados</p>
              <section className={styles.planPatientsList}>
                {plan.usuarios?.length ? (
                  plan.usuarios.map((usuario) => (
                    <div key={usuario.id} className={styles.planItem}>
                      <Image
                        src={usuario?.imagenPerfil || "/image-angels.png"}
                        alt={usuario?.nombreUsuario}
                        width={65}
                        height={65}
                      />

                      <div className={styles.planItemInfo}>
                        <h4>{usuario?.nombreUsuario}</h4>
                        <p>{usuario?.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h3>No hay pacientes asignados.</h3>
                )}
              </section>
            </section>
          </section>
          <section className={styles.planDates}>
            <p>Horarios y fechas</p>
            <div className={styles.planInfo}>
              <h4>Hora:</h4>
              <div className={styles.flexTime}>
                <Image src="/reloj.svg" alt="tiempo" width={25} height={30} />
                <p>{plan.sessionHour}</p>
              </div>
            </div>
            <div className={styles.planInfo}>
              <h4>Fechas:</h4>
              <section className={styles.listDates}>
                {plan.selectedDays?.length ? (
                  plan.selectedDays.map((day) => (
                    <div className={styles.flexMap} key={day}>
                      <Image src="/cal.svg" alt="tiempo" width={25} height={30} />
                      <h5>
                        {new Date(day).toLocaleDateString("es-ES", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </h5>
                    </div>
                  ))
                ) : (
                  <p>No hay fechas registradas.</p>
                )}
              </section>
            </div>

            <button
              onClick={async () => {
                const confirmDelete = window.confirm(
                  `¿Eliminar la sesión "${plan.title}"?`,
                );

                if (!confirmDelete) return;

                try {
                  await deletePlan(plan.id);
                } catch {
                  alert("No se pudo eliminar la sesión.");
                }
              }}
            >
              Eliminar
            </button>
          </section>
        </article>
      ))}
    </section>
  );
}
