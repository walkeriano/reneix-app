import styles from "./generadorCodigo.module.css";

export default function GeneradorCodigo({
  nombreUsuario,
  movil,
  onGenerar,
}) {
  const generarCodigo = () => {
    const texto = `${nombreUsuario}${movil}`;

    let suma = 0;

    for (let i = 0; i < texto.length; i++) {
      suma += texto.charCodeAt(i);
    }

    const codigo = String(suma % 1000000).padStart(6, "0");

    onGenerar(codigo);
  };

  return (
    <button
      type="button"
      onClick={generarCodigo}
      disabled={!nombreUsuario || !movil}
      className={styles.btnReady}
    >
      Generar código de acceso
    </button>
  );
}