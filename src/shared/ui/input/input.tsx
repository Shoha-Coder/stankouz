import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, label, ...props }, ref) => {
        return (
            <div className={styles.inputWrapper}>
                {label && (
                    <label className={styles.label} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`}
                    {...props}
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

