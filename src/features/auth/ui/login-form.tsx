'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLogin } from '../model/useLogin';
import styles from './login-form.module.scss';

export function LoginForm() {
  const t = useTranslations('auth.login');
  const { mutateAsync, isPending } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t('emailPlaceholder')}
      />
      <input
        className={styles.input}
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder={t('passwordPlaceholder')}
      />
      <button className={styles.button} type="submit" disabled={isPending}>
        {isPending ? t('signingIn') : t('signIn')}
      </button>
    </form>
  );
}
