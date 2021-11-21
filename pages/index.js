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

export async function getStaticProps() {
  const URL = 'https://events-168a8-default-rtdb.asia-southeast1.firebasedatabase.app/events.json';

  const data = await fetch(URL);
  console.log(data);
  // function getFeaturedEvents() {
  //   return data.filter((event) => event.isFeatured);
  // }

  // const filteredEvents = getFeaturedEvents();

  return {
    props: {
      featuredEvents: 'data'
    },
    revalidate: 1000
  };
}
