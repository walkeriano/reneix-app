import usePlanningList from "@/hooks/usePlanningList";

export default function PlanningEvents() {
  const { plans, loading, error } = usePlanningList();

  if (loading) return <p>Cargando sesiones...</p>;

  if (error) return <p>Error al cargar las sesiones.</p>;

  if (plans.length === 0) {
    return <p>No existen sesiones registradas.</p>;
  }

  return (
    <section>
      {plans.map((plan) => (
        <article key={plan.id}>
          <h3>{plan.title}</h3>

          <p>
            Inicio:
            {" "}
            {new Date(plan.startDate).toLocaleString()}
          </p>

          <p>
            Fin:
            {" "}
            {new Date(plan.endDate).toLocaleString()}
          </p>
        </article>
      ))}
    </section>
  );
}