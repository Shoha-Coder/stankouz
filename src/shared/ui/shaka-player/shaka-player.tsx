"use client";

import { useEffect, useRef } from "react";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";

import styles from "./shaka-player.module.scss";

type Props = {
  src: string;
  poster?: string;
};

export function ShakaPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    shaka.polyfill.installAll();

    const player = new shaka.Player(videoRef.current);
    const ui = new shaka.ui.Overlay(
      player,
      containerRef.current,
      videoRef.current,
    );

    player.load(src).catch(console.error);

    if (poster) {
      videoRef.current.poster = poster;
    }

    return () => {
      ui.destroy();
      player.destroy();
    };
  }, [src, poster]);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <video ref={videoRef} className={styles.video} autoPlay />
    </div>
  );
}
