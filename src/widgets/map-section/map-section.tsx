import styles from "./map-section.module.scss";

const MapSection = () => {
  return (
    <div className={styles.mapSection}>
      <h2 className={styles.title}>Xaritada joylashuvimiz</h2>
      <div className={styles.mapWrap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3767.9743448158447!2d65.348624!3d40.085757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c7cc417399af%3A0x7b280d8da54ee6c!2sGIDRO%20STANKO%20SERVIS%20Navoiy!5e1!3m2!1sen!2sus!4v1770266631538!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          className={styles.map}
          title="Xaritada joylashuvimiz"
        />
      </div>
    </div>
  );
};

export default MapSection;
