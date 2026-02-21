"use client";

import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@/shared/ui/icons";
import styles from "./contact-section.module.scss";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useSubmitApplication } from "@/entities/contact";
import { formatPhoneUz, parsePhoneForSubmit } from "@/shared/lib/format-phone";

export function ContactSection() {
  const tForm = useTranslations("form");
  const tFooter = useTranslations("footer");
  const [phoneValue, setPhoneValue] = useState("");
  const { mutate, isPending, isSuccess, isError, reset } = useSubmitApplication();

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(formatPhoneUz(e.target.value));
  }, []);

  const handleNameKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/[0-9]/.test(e.key)) e.preventDefault();
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const name = (formData.get("name") as string)?.trim();
      const phone_number = parsePhoneForSubmit(phoneValue);
      const email = (formData.get("email") as string)?.trim();
      const message = (formData.get("message") as string)?.trim();

      if (!name || phone_number.length < 12) return;

      mutate(
        { name, phone_number, email: email || undefined, message: message || undefined, page: "contacts" },
        {
          onSuccess: () => {
            form.reset();
            setPhoneValue("");
          },
        }
      );
    },
    [phoneValue, mutate]
  );

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.info}>
          <h2 className={styles.title}>{tForm("title1")}</h2>

          <div className={styles.block}>
            <span className={styles.label}>{tFooter("address")}</span>
            <p className={styles.text}>
              100017, Toshkent sh., Chilonzor t., Bunyodkor ko‘chasi, 24
            </p>
          </div>

          <div className={styles.block}>
            <span className={`${styles.label}`}>{tFooter("email")}</span>
            <Link href="mailto:info@stanko.uz" className={styles.email}>info@stanko.uz</Link>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>{tFooter("phones")}</span>
            <Link href="tel:+998792220077" className={styles.number}>+998 79 222 00 77</Link>
            <Link href="tel:+998906467277" className={styles.number}>+998 90 646 72 77</Link>
          </div>

          <div className={styles.socialBlock}>
            <div>
              <span className={`${styles.label} ${styles.socialsLabel}`}>
                {tForm("social")}
              </span>
              <div className={styles.socials}>
                <InstagramIcon className={styles.icon} />
                <TelegramIcon className={styles.icon} />
                <FacebookIcon className={styles.icon} />
                <YouTubeIcon className={styles.icon} />
              </div>
            </div>
          </div>

          <div className={styles.bgLogo} />
        </div>

        {/* RIGHT */}
        <div className={styles.formCard}>
          <h3>{tForm("title2")}</h3>

          {isSuccess ? (
            <div className={styles.success}>
              <p>{tForm("success")}</p>
              <button type="button" onClick={() => { reset(); setPhoneValue(""); }}>
                {tForm("sendAnother")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <input
                  name="name"
                  placeholder={tForm("name-surname")}
                  required
                  disabled={isPending}
                  onKeyDown={handleNameKeyDown}
                  onChange={handleNameChange}
                  autoComplete="name"
                />
                <input
                  type="tel"
                  name="phone_number"
                  placeholder={tForm("phone")}
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  required
                  disabled={isPending}
                  autoComplete="tel"
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder={tForm("email")}
                disabled={isPending}
                autoComplete="email"
              />

              <textarea name="message" placeholder={tForm("message")} disabled={isPending} />

              {isError && <p className={styles.error}>{tForm("error")}</p>}

              <button type="submit" disabled={isPending}>
                {isPending ? tForm("sending") : tForm("send")} <span>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
