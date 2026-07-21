import styles from "./navBar.module.css";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <section className={styles.navBarContainer}>
      <section className={styles.navBarItems}>
        <Link href="/">
          <Image src="/home.svg" width={18} height={24} alt="Home Icon" />
        </Link>
        <button>
          <Image src="/person.svg" width={24} height={24} alt="Home Icon" />
        </button>
        <a
          href="https://wa.me/34639405634?text=Hola%20¿me%20brindas%20más%20información?"
          target="_blank"
        >
          <Image src="/wss.svg" width={27} height={24} alt="Home Icon" />
        </a>
      </section>
    </section>
  );
}
