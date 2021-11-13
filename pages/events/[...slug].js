import { useRouter } from 'next/router';
import Link from 'next/link';

export default function FilteredPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>Filtered Event Page</h1>
      <div>Here we will show filtered events.</div>
      <button>
        <Link href={'/'}>Featured Events</Link>
      </button>
      <button>
        <Link href={'/events/'}>All Events</Link>
      </button>
    </div>
  );
}
