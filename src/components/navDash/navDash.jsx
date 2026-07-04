import styles from "./navDash.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

export default function NavDash() {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    // Cuando cambie la ruta, hacer scroll hacia el botón activo
    if (activeRef.current && containerRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [pathname]);

  // Lista de botones para renderizar
  const navItems = [
    {
      name: "Locker",
      path: "/dashboard-admin-locker",
      icon: "/locker-img.png",
    },
    {
      name: "Registro",
      path: "/dashboard-admin-registro",
      icon: "/icon-one.svg",
    },
    {
      name: "Planning",
      path: "/dashboard-admin-planning",
      icon: "/calendar.svg",
    },
  ];

  return (
    <section className={styles.containerNav}>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            ref={isActive ? activeRef : null}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            <Image
              src={item.icon}
              width={25}
              height={25}
              alt="Video Icon"
            />
            <p>{item.name}</p>
          </Link>
        );
      })}
    </section>
  );
}
