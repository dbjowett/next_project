import styles from '../styles/Home.module.css';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

export default function HomePage({ events }) {
  return (
    <div>
      <h1 className={styles.container}>Upcoming Events</h1>
      <div>
        <EventList items={events} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      events
    },
    revalidate: 2000
  };
}
