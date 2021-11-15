import { useRouter } from 'next/router';
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import { Fragment } from 'react';

export default function EventsPage() {
  // Fire function and store it in Events
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
