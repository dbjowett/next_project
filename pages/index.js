import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

export default function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>Dev Events</title>
        <meta name='description' content='All types of upcoming developer events to meet people with similar interests' />
      </Head>
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
