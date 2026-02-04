import { User } from '../model/types';
import styles from './UserCard.module.scss';

export function UserCard({ user }: { user: User }) {
  return (
    <section className={styles.card}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </section>
  );
}
