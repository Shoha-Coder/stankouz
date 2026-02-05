import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";
import { ArrowRightIcon } from "../icons";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlineButton?: boolean;
  circleClassName?: string;
  textClassName?: string;
};

export function Button({ className, ...props }: ButtonProps) {
  if (props.outlineButton) {
    return (
      <button className={`${styles.outlineBtn} ${className}`} {...props}>
        <span className={`${styles.text} ${props.textClassName || 'inter'}`}>{props.children}</span>
        <span className={`${styles.iconCircle} ${props.circleClassName}`}>
          <ArrowRightIcon />
        </span>
      </button>
    );
  }
  return (
    <button
      className={[styles.button, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
