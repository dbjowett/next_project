import { getEventById, getAllEvents } from '../../helpers/api-util';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import EventAlert from '../../components/ui/error-alert';

export default function DetailPage({ event }) {
  if (!event) {
    return (
      <EventAlert>
        <div> No event found!</div>
      </EventAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const event = await getEventById(params.id);
  return {
    props: {
      event
    }
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  const paths = allEvents.map((event) => ({ params: { id: event.id } }));
  return {
    paths,
    fallback: false
  };
}
