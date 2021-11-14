import styles from '../styles/Home.module.css';
import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

export default function HomePage() {
  // This will fire the function and store the result in featuredEvents
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1 className={styles.container}>Upcoming Events</h1>
      <div>
        <EventList items={featuredEvents} />
      </div>
    </div>
  );
}
