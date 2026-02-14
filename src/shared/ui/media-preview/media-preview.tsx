"use client";

import styles from "./media-preview.module.scss";

type Props = {
  poster: string;
  onClick?: () => void;
};

export function MediaPreview({ poster, onClick }: Props) {
  return (
    <button
      type="button"
      className={styles.root}
      onClick={onClick}
      aria-label="Play video"
    >
      <img src={poster} alt="" className={styles.image} />

      <svg
        width="90"
        height="90"
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.play}
      >
        <g clipPath="url(#clip0_463_9)">
          <path
            d="M34.5 31V59C34.4999 59.3114 34.5829 59.6171 34.7404 59.8857C34.8979 60.1543 35.1243 60.3761 35.396 60.528C35.6678 60.6799 35.9752 60.7566 36.2865 60.7501C36.5979 60.7436 36.9018 60.6542 37.167 60.491L59.917 46.491C60.1718 46.3344 60.3822 46.1152 60.5282 45.8542C60.6742 45.5931 60.7508 45.2991 60.7508 45C60.7508 44.7009 60.6742 44.4069 60.5282 44.1459C60.3822 43.8848 60.1718 43.6656 59.917 43.509L37.167 29.509C36.9018 29.3458 36.5979 29.2564 36.2865 29.2499C35.9752 29.2434 35.6678 29.3201 35.396 29.472C35.1243 29.624 34.8979 29.8457 34.7404 30.1143C34.5829 30.3829 34.4999 30.6886 34.5 31Z"
            fill="white"
          />
        </g>
        <circle cx="45" cy="45" r="44" stroke="white" strokeWidth="2" />
        <defs>
          <clipPath id="clip0_463_9">
            <rect
              width="42"
              height="42"
              fill="white"
              transform="translate(24 24)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}
