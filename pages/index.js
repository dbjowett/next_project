import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1 className={styles.container}>Starting page</h1>
      <div>Here we will show the featured page</div>
      <button>
        <Link href={'/events/'}>All Events</Link>
      </button>
    </div>
  );
}
