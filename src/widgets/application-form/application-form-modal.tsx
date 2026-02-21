"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSubmitApplication } from "@/entities/contact";
import { ArrowRightIcon } from "@/shared/ui/icons";
import UploadIcon from "@/shared/ui/icons/upload";
import { formatPhoneUz, parsePhoneForSubmit } from "@/shared/lib/format-phone";
import styles from "./application-form-modal.module.scss";

const ANIMATION_DURATION_MS = 300;

const RESUME_MAX_SIZE_MB = 10;
const RESUME_ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png";

export interface ApplicationFormModalProps {
  open: boolean;
  onClose: () => void;
  vacancyId?: number;
  page?: string;
}

export function ApplicationFormModal({
  open,
  onClose,
  vacancyId,
  page,
}: ApplicationFormModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const { mutate, isPending, isSuccess, isError, reset } = useSubmitApplication();

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const t = setTimeout(() => setMounted(false), ANIMATION_DURATION_MS);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    if (mounted) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mounted, handleEscape]);

  useEffect(() => {
    if (open) {
      reset();
      setFileName("");
      setPhoneValue("");
    }
  }, [open, reset]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneUz(e.target.value);
    setPhoneValue(formatted);
  }, []);

  const handleNameKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/[0-9]/.test(e.key)) e.preventDefault();
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const phone_number = parsePhoneForSubmit(phoneValue);
    const email = (formData.get("email") as string)?.trim();
    const resume = formData.get("resume") as File | null;

    if (!name || phone_number.length < 12) return;

    const file = resume && resume.size > 0 ? resume : undefined;
    if (file && file.size > RESUME_MAX_SIZE_MB * 1024 * 1024) return;

    mutate(
      {
        vacancy_id: vacancyId,
        name,
        phone_number,
        email: email || undefined,
        resume: file,
        page,
      },
      {
        onSuccess: () => {
          form.reset();
          setFileName("");
          setPhoneValue("");
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      }
    );
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > RESUME_MAX_SIZE_MB * 1024 * 1024) {
      e.target.value = "";
      setFileName("");
      return;
    }
    setFileName(file?.name ?? "");
  };

  if (!mounted || typeof document === "undefined") return null;

  const content = (
    <div
      className={`${styles.overlay} ${closing ? styles.overlayLeave : styles.overlayEnter}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-form-title"
    >
      <div
        className={`${styles.modal} ${closing ? styles.modalLeave : styles.modalEnter}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Yopish"
        >
          <span aria-hidden>×</span>
        </button>

        <h2 id="application-form-title" className={styles.title}>
          Ariza qoldirish
        </h2>

        {isSuccess ? (
          <div className={styles.success}>
            <p>Arizangiz muvaffaqiyatli yuborildi!</p>
            <button type="button" className={styles.successBtn} onClick={handleClose}>
              Yopish
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input
                type="text"
                name="name"
                placeholder="Ismingizni kiriting"
                required
                disabled={isPending}
                className={styles.input}
                autoComplete="name"
                onKeyDown={handleNameKeyDown}
                onChange={handleNameChange}
              />
            </div>

            <div className={styles.field}>
              <input
                type="tel"
                name="phone_number"
                placeholder="+998 (00) 000-00-00"
                value={phoneValue}
                onChange={handlePhoneChange}
                required
                disabled={isPending}
                className={styles.input}
                autoComplete="tel"
              />
            </div>

            <div className={styles.field}>
              <input
                type="email"
                name="email"
                placeholder="Elektron pochta manzili (ixtiyoriy)"
                disabled={isPending}
                className={styles.input}
                autoComplete="email"
              />
            </div>

            <div
              className={styles.uploadArea}
              onClick={handleUploadClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleUploadClick();
                }
              }}
              aria-label="Rezyumeingizni yuklang"
            >
              <input
                ref={fileInputRef}
                type="file"
                name="resume"
                accept={RESUME_ACCEPT}
                onChange={handleFileChange}
                className={styles.fileInput}
                tabIndex={-1}
              />
              <UploadIcon className={styles.uploadIcon} />
              <span className={styles.uploadText}>
                {fileName || "Rezyumeingizni yuklang"}
              </span>
            </div>

            {isError && (
              <p className={styles.error}>
                Xatolik yuz berdi. Iltimos, qaytadan urinib ko&apos;ring.
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={styles.submitBtn}
            >
              <span className={styles.submitText}>
                {isPending ? "Yuborilmoqda..." : "Ariza yuborish"}
              </span>
              <span className={styles.iconCircle}>
                <ArrowRightIcon />
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
