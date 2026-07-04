import styles from "./navBar.module.css";
import Image from "next/image";

export default function NavBar() {
  return (
    <section className={styles.navBarContainer}>
      <section className={styles.navBarItems}>
        <button>
          <Image src="/home.svg" width={18} height={24} alt="Home Icon" />
        </button>
        <button>
          <Image src="/person.svg" width={24} height={24} alt="Home Icon" />
        </button>
        <button>
          <Image src="/chat.svg" width={27} height={24} alt="Home Icon" />
        </button>
      </section>
    </section>
  );
}
