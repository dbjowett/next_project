import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1 className={styles.container}>Hddellooo</h1>
      <button>
        <Link href={'/daniel'}>Daniel</Link>
      </button>
    </div>
  );
}
