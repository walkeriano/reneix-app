import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import styles from "./heroApp.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/header";
import SliderFunctions from "@/components/sliderFunctions/sliderFunctions";
import NavBar from "@/components/navBar/navBar";
import LockerContent from "@/components/lockerContent/lockerContent";
import PlanningContent from "@/components/planningContent/planningContent";

export default function HeroApp() {
  const [activeSlide, setActiveSlide] = useState(true);
  const [view, setView] = useState("buttons");
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/sesion-usuario");
    }
  }, [user, router]);

  return (
    <section className={styles.heroContainer}>
      <Header user={user} />
      {activeSlide ? (
        <SliderFunctions setActiveSlide={setActiveSlide} />
      ) : (
        <section className={styles.activeMentoria}>
          <button
            onClick={() => setActiveSlide(true)}
            className={styles.closeButton}
          >
            <Image src="/x-mark.svg" width={15} height={15} alt="Video Icon" />
          </button>
          <section className={styles.mentoriaContent}>
            <section className={styles.mentoriaFlex}>
              <section className={styles.mentoriaPage}>
                <Image
                  src="/icon-one.svg"
                  width={60}
                  height={60}
                  alt="Mentoria Image"
                />
                <div className={styles.mentInfo}>
                  <h3>Mentoria rehaz tu vida</h3>
                  <p>Detalles</p>
                </div>
              </section>
              <section className={styles.mentoriaUser}>
                <div className={styles.userInfo}>
                  <h4>{user?.nombreUsuario}</h4>
                  <div className={styles.userBoxFlex}>
                    <p>{user?.ciudad},</p>
                    <p>{user?.pais}</p>
                  </div>
                </div>
                <div className={styles.userPerfil}>
                  <Image
                    src={user?.imagenPerfil}
                    fill={true}
                    alt="Mentoria Image"
                  />
                </div>
              </section>
            </section>
            {view === "locker" && <LockerContent setView={setView} />}
            {view === "planning" && <PlanningContent setView={setView} />}
            {view === "buttons" && (
              <section className={styles.mentoriaButtons}>
                <button onClick={() => setView("planning")}>
                  <Image
                    src="/calendar.svg"
                    width={35}
                    height={35}
                    alt="Video Icon"
                  />
                  <p>Planning</p>
                </button>
                <Link href={user?.linkVideollamada}>
                  <Image
                    src="/icon-call.png"
                    width={48}
                    height={42}
                    alt="Video Icon"
                  />
                  <p>Ir a consulta</p>
                </Link>
                <button onClick={() => setView("locker")}>
                  <Image
                    src="/locker-img.png"
                    width={40}
                    height={35}
                    alt="Video Icon"
                  />
                  <p>Locker</p>
                </button>
              </section>
            )}
          </section>
        </section>
      )}
      <NavBar />
      <div className={styles.heroImageContainer}>
        <Image src="/movil-bg.jpg" fill={true} alt="Hero Image" />
      </div>
      <div className={styles.heroImageContainerTwo}>
        <Image src="/image-angels.jpg" fill={true} alt="Hero Image" />
      </div>
    </section>
  );
}
