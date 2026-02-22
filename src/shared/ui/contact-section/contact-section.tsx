"use client";

import Link from "next/link";
import { FacebookIcon, InstagramIcon, TelegramIcon, YouTubeIcon } from "../icons";
import styles from "./contact-section.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { SlidingIcon } from "@/shared/ui/sliding-icon";
import slidingStyles from "@/shared/ui/sliding-icon/sliding-icon.module.scss";
import { useCallback, useState } from "react";
import { useSubmitApplication } from "@/entities/contact";
import { formatPhoneUz, parsePhoneForSubmit } from "@/shared/lib/format-phone";

export interface ContactSectionProps {
  page?: string;
}

export function ContactSection({ page = "home" }: ContactSectionProps) {
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
        { name, phone_number, email: email || undefined, message: message || undefined, page },
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
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.info}>
          <h2 className={styles.title}>Aloqa ma’lumotlari</h2>

          <div className={styles.block}>
            <span className={styles.label}>Bosh ofis manzili</span>
            <p className={styles.text}>
              100017, Toshkent sh., Chilonzor t., Bunyodkor ko‘chasi, 24
            </p>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>Ishonch telefoni</span>
            <Link href="tel:+998792220077">+998 79 222 00 77</Link>
            <Link href="tel:+998906467277">+998 90 646 72 77</Link>
          </div>

          <div className={styles.socialBlock}>
            <div className={styles.block}>
              <span className={styles.label}>Elektron pochta manzili</span>
              <Link href="mailto:info@stanko.uz">info@stanko.uz</Link>
            </div>

            <div>
              <span className={`${styles.label} ${styles.socialsLabel}`}>Ijtimoiy tarmoqlar</span>
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Ariza qoldirish</h2>

          {isSuccess ? (
            <div className={styles.success}>
              <p>Xabaringiz muvaffaqiyatli yuborildi!</p>
              <button type="button" onClick={() => { reset(); setPhoneValue(""); }}>
                Yana yuborish
              </button>
            </div>
          ) : (
            <>
              <div className={styles.row}>
                <input
                  name="name"
                  placeholder="Ismingizni kiriting"
                  required
                  disabled={isPending}
                  onKeyDown={handleNameKeyDown}
                  onChange={handleNameChange}
                  autoComplete="name"
                />
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="+998 (00) 000-00-00"
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
                placeholder="Elektron pochta manzili (ixtiyoriy)"
                disabled={isPending}
                autoComplete="email"
              />

              <textarea name="message" placeholder="Xabar (ixtiyoriy)" disabled={isPending} />

              {isError && <p className={styles.error}>Xatolik yuz berdi. Iltimos, qaytadan urinib ko&apos;ring.</p>}

              <button type="submit" className={`${styles.submit} ${slidingStyles.slidingIconHover}`} disabled={isPending}>
                {isPending ? "Yuborilmoqda..." : "Xabar yuborish"}
                <span className={styles.submitIcon}>
                  <SlidingIcon>
                    <ArrowRight />
                  </SlidingIcon>
                </span>
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
