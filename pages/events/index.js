import Link from 'next/link';

export default function EventsPage() {
  return (
    <div>
      <h1>Events Page</h1>
      <div>Here we will show all events.</div>
      <button>
        <Link href={'/'}>Featured Events</Link>
      </button>
    </div>
  );
}
