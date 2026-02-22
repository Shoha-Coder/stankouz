"use client";

import { useState } from "react";
import { ShakaPlayer } from "@/shared/ui/shaka-player/shaka-player";
import { MediaPreview } from "@/shared/ui/media-preview/media-preview";
import { useBanners } from "@/entities/banner/model/useBanners";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { Skeleton } from "@/shared/ui/skeleton";
import styles from "./player.module.scss";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { data: banners, isPending } = useBanners("about");
  const banner = banners?.[0];
  const poster = banner?.images ? getFallbackImage(banner.images) : "";
  const videoUrl = banner?.url?.trim() || null;

  const posterImage = poster || "/images/preview.png";

  if (isPending) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.player}>
          <Skeleton className={styles.skeleton} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.player}>
        {banner && videoUrl && isPlaying ? (
          <ShakaPlayer src={videoUrl} />
        ) : (
          <MediaPreview
            poster={posterImage}
            onClick={banner && videoUrl ? () => setIsPlaying(true) : undefined}
          />
        )}
      </div>
      <p className={styles.text} dangerouslySetInnerHTML={{ __html: banner?.desc || "" }} />
    </div>
  );
};

export default Player;
