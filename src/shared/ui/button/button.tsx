import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return <button className={[styles.button, className].filter(Boolean).join(' ')} {...props} />;
}
