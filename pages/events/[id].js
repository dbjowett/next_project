import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DetailPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>Single Event Page</h1>
      <div>Here we will show a selected event.</div>
      <button>
        <Link href={'/'}>Featured Events</Link>
      </button>
      <button>
        <Link href={'/events/'}>All Events</Link>
      </button>
    </div>
  );
}
