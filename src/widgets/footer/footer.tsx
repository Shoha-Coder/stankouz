import Logo from "@/shared/ui/icons/logo";
import styles from "./footer.module.scss";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@/shared/ui/icons";

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* TOP */}
      <div className={styles.top}>
        {/* ADDRESS */}
        <div className={styles.col}>
          <span className={styles.label}>Bosh ofis manzili</span>
          <p className={styles.address}>
            100017, Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko‘chasi,
            24
          </p>

          <span className={styles.label}>Elektron pochta manzili</span>
          <a href="mailto:info@stanko.uz" className={styles.email}>
            info@stanko.uz
          </a>

          <span className={styles.label}>Ishonch telefoni</span>
          <a href="tel:+998792220077" className={styles.phone}>
            +998 79 222 00 77
          </a>
          <a href="tel:+998906467277" className={styles.phone}>
            +998 90 646 72 77
          </a>
        </div>

        {/* MAP */}
        <div className={styles.col}>
          <span className={styles.label}>Ofis joylashuvi</span>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3767.9743448158447!2d65.348624!3d40.085757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c7cc417399af%3A0x7b280d8da54ee6c!2sGIDRO%20STANKO%20SERVIS%20Navoiy!5e1!3m2!1sen!2sus!4v1770266631538!5m2!1sen!2sus"
              width="433"
              height="262"
              allowFullScreen
              loading="lazy"
              title="Ofis joylashuvi xaritasi"
            />
          </div>
        </div>

        {/* CATALOG */}
        <div className={styles.col}>
          <ul className={styles.menu}>
            <li>Katalog</li>
            <li className={styles.active}>Biz haqimizda</li>
            <li>Mahsulotlar</li>
            <li>Stanoklar</li>
            <li>Laboratoriya</li>
            <li>Yangiliklar</li>
          </ul>
        </div>

        {/* JOBS */}
        <div className={styles.col}>
          <ul className={styles.menu}>
            <li>Bo‘sh ish o‘rinlari</li>
            <li>Aloqa</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.subBottom}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <div className={styles.socials}>
          <a className={styles.social}>
            <InstagramIcon />
          </a>
          <a className={`${styles.social}`}>
            <TelegramIcon />
          </a>
          <a className={styles.social}>
            <FacebookIcon />
          </a>
          <a className={styles.social}>
            <YouTubeIcon />
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>
          © 2026 “Gidro Stanko Servis” MChJ Barcha huquqlar himoyalangan.
        </span>
        <span>Maxfiylik siyosati</span>
        <span>Sayt ishlab chiquvchi – NDC Group</span>
      </div>
    </footer>
  );
}
