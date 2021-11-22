import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

export default function DetailPage({ event }) {
  if (!event) {
    return (
      <div className='center'>
        <div> Loading...</div>
      </div>
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
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { id: event.id } }));
  return {
    paths,
    fallback: true
  };
}
