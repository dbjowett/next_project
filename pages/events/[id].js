import { useRouter } from 'next/router';

import { getEventById } from '../../dummy-data';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import EventAlert from '../../components/ui/error-alert';

export default function DetailPage() {
  const router = useRouter();
  const currentEvent = getEventById(router.query.id);
  console.log(currentEvent);

  if (!currentEvent) {
    return (
      <EventAlert>
        <div> No event found!</div>
      </EventAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={currentEvent.title} />
      <EventLogistics date={currentEvent.date} address={currentEvent.location} image={currentEvent.image} imageAlt={currentEvent.title} />
      <EventContent>
        <p>{currentEvent.description}</p>
      </EventContent>
    </Fragment>
  );
}
