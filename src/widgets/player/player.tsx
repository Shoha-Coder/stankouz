import React, { useState } from "react";
import { ShakaPlayer } from "../../shared/ui/shaka-player/shaka-player";
import { MediaPreview } from "../../shared/ui/media-preview/media-preview";
import styles from "./player.module.scss";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.player}>
        {isPlaying ? (
          <ShakaPlayer src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        ) : (
          <MediaPreview
            onClick={() => setIsPlaying(true)}
            poster="/images/preview.png"
          />
        )}
      </div>
      <p className={styles.text}>
        Общество с Ограниченной Ответственностью «GIDRO STANKO SERVIS» создано в
        марте 2007 года на территории города Навоийской области с Уставным
        капиталом свыше 166,3 млн. сум. Общество с Ограниченной Ответственностью
        «GIDRO STANKO SERVIS» создано в марте 2007 года на территории города
        Навоийской области с Уставным капиталом свыше 166,3 млн. сум. Общество с
        Ограниченной Ответственностью «GIDRO STANKO SERVIS» создано в марте 2007
        года на территории города Навоийской области с Уставным капиталом свыше
        166,3 млн. сум. Общество с Ограниченной Ответственностью «GIDRO STANKO
        SERVIS» создано в марте 2007 года на территории города Навоийской
        области с Уставным капиталом свыше 166,3 млн. сум. Общество с
        Ограниченной Ответственностью «GIDRO STANKO SERVIS» создано в марте 2007
        года на территории города Навоийской области с Уставным капиталом свыше
        166,3 млн. сум. Общество с Ограниченной Ответственностью «GIDRO STANKO
        SERVIS» создано в марте 2007 года на территории города Навоийской
        области с Уставным капиталом свыше 166,3 млн. сум.
      </p>
    </div>
  );
};

export default Player;
