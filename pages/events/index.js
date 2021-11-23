import { useRouter } from 'next/router';
import { getAllEvents, getFeaturedEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import { Fragment } from 'react';
import Head from 'next/head';

export default function EventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name='description' content='All types of upcoming developer events to meet people with similar interests' />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events
    },
    revalidate: 500
  };
}
