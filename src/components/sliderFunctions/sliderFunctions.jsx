import styles from "./sliderFunctions.module.css";
import Image from "next/image";
import Link from "next/link";
import getNextSession from "@/utils/getNextSession";

export default function SliderFunctions({ setActiveSlide, planning }) {
  const nextSession = getNextSession(
    planning?.selectedDays,
    planning?.sessionHour,
  );

  return (
    <section className={styles.boxFunctionsContainer}>
      <section className={styles.welcomeContainer}>
        <h1>Bienvenida</h1>
        <h2>¿Qué retos tienes hoy?</h2>
      </section>
      {nextSession && (
        <section className={styles.nextCita}>
          <p>Próxima sesión:</p>
          <p>
            {nextSession.date} a las {nextSession.hour} {nextSession.period}
          </p>
        </section>
      )}
      <section className={styles.sliderFunctionsContainer}>
        <section
          onClick={() => setActiveSlide(false)}
          className={styles.optionItem}
        >
          <Image src="/icon-one.svg" width={40} height={40} alt="icono-1" />
          <h3>Mentoría rehaz tu vida</h3>
        </section>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://app.rehaztuvida.es/widget/bookings/ngels-crcoles-pmies-personal-calendar-ukgp0b9vv"
          className={styles.optionItem}
        >
          <Image src="/icon-two.svg" width={40} height={40} alt="icono-1" />
          <h3>Agendar nueva cita</h3>
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.amazon.es/s?k=rehaz+tu+vida&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=88PBSTTK68LE&sprefix=rehaz+tu+vida%2Caps%2C99&ref=nb_sb_noss"
          className={styles.optionItem}
        >
          <Image src="/icon-tre.svg" width={40} height={40} alt="icono-1" />
          <h3>Comprar libro Rehaz tu vida</h3>
        </Link>
        <section className={styles.optionItem}>
          <Image src="/icon-for.svg" width={40} height={40} alt="icono-1" />
          <h3>Visitar canal de you tube</h3>
        </section>
      </section>
    </section>
  );
}
