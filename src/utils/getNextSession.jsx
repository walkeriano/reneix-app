export default function getNextSession(selectedDays = [], sessionHour = "") {
  if (!selectedDays.length || !sessionHour) {
    return null;
  }

  // Fecha actual sin hora
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Ordenar fechas
  const orderedDays = [...selectedDays].sort(
    (a, b) => new Date(a) - new Date(b),
  );

  // Buscar la próxima fecha disponible
  const nextDay = orderedDays.find((day) => {
    const date = new Date(day);
    date.setHours(0, 0, 0, 0);
    return date >= today;
  });

  if (!nextDay) {
    return null;
  }

  const nextDate = new Date(nextDay);
  nextDate.setHours(0, 0, 0, 0);

  const isToday = nextDate.getTime() === today.getTime();

  // Formatear fecha
  const formattedDate = isToday
    ? "Hoy"
    : nextDate.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      });

  // Convertir hora
  const [hour, minutes] = sessionHour.split(":").map(Number);

  let displayHour = hour;
  let period = "AM";

  if (hour === 0) {
    displayHour = 12;
  } else if (hour === 12) {
    period = "PM";
  } else if (hour > 12) {
    displayHour = hour - 12;
    period = "PM";
  }

  return {
    date: formattedDate,
    hour: `${displayHour}:${minutes.toString().padStart(2, "0")}`,
    period,
  };
}
