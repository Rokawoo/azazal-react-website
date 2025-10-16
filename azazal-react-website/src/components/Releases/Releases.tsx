import styles from "./Releases.module.css";

export const Releases = () => {
  return (
    <div className={styles.backgroundColor}>
      <div className={`${styles.wave} ${styles.primary}`}></div>

      <section className={styles.container} id="releases">
        <h2 className={styles.title}>Releases</h2>
        <div className={styles.content}>

        </div>
      </section>
    </div>
  );
};