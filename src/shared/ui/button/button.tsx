import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";
import { ArrowRightIcon } from "../icons";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlinebutton?: boolean;
  circleClassName?: string;
  textClassName?: string;
};

export function Button({
  className,
  outlinebutton,
  circleClassName,
  textClassName,
  ...props
}: ButtonProps) {
  if (outlinebutton) {
    return (
      <button className={`${styles.outlineBtn} ${className}`} {...props}>
        <span className={`${styles.text} ${textClassName || "inter"}`}>
          {props.children}
        </span>
        <span className={`${styles.iconCircle} ${circleClassName}`}>
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
