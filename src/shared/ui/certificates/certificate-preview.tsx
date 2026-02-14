"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./certificate-preview.module.scss";
import { ArrowRightIcon } from "../icons";
import type { CertificateItem } from "./certificates-carousel";
import Image from "next/image";

type Props = {
  open: boolean;
  items: CertificateItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

const ZOOM_STEP = 0.25;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

function ZoomInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M8 11h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CertificatePreview({ open, items, currentIndex, onClose, onPrev, onNext }: Props) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const currentItem = items[currentIndex];
  const hasMultiple = items.length > 1;
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < items.length - 1;


  const handleZoomIn = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomOut = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [open, currentIndex]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && canNext && onNext) onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, canPrev, canNext, onPrev, onNext]);

  if (!open || !currentItem) return null;

  return (
    <div
      className={`${styles.overlay} ${styles.visible}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        className={styles.closeBtn}
        onClick={handleClose}
        aria-label="Close"
      >
        ×
      </button>

      {hasMultiple && onPrev && onNext && (
        <>
          <button
            className={`${styles.navBtn} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              if (canPrev) onPrev();
            }}
            disabled={!canPrev}
            aria-label="Previous image"
          >
            <ArrowRightIcon className={styles.arrowIcon} />
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation();
              if (canNext) onNext();
            }}
            disabled={!canNext}
            aria-label="Next image"
          >
            <ArrowRightIcon className={styles.arrowIcon1} />
          </button>
        </>
      )}

      <div
        className={styles.wrapper}
        onClick={() => {
          if (zoom > 1) {
            setZoom(1);
            setPosition({ x: 0, y: 0 });
          }
        }}
      >
        <div
          className={styles.imageContainer}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (zoom < MAX_ZOOM) setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
          }}
        >
          <Image src={currentItem.image} alt={currentItem.alt ?? "Certificate"} draggable={false} width={514} height={320} />
        </div>
      </div>

      <div className={styles.toolbar} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.toolbarBtn}
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
        >
          <ZoomOutIcon />
        </button>
        <span className={styles.counter}>
          {Math.round(zoom * 100)}%
        </span>
        <button
          className={styles.toolbarBtn}
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
        >
          <ZoomInIcon />
        </button>
        {hasMultiple && (
          <span className={styles.counter}>
            {currentIndex + 1} / {items.length}
          </span>
        )}
      </div>
    </div>
  );
}
