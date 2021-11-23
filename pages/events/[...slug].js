import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';
import Head from 'next/head';

export default function FilteredPage({ filteredEvents, numYear, numMonth }) {
  const pageHead = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`All events for ${numMonth}/${numYear}`} />
    </Head>
  );

  if (!filteredEvents) {
    return (
      <Fragment>
        {pageHead}
        <p className='center'>Loading...</p>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHead}
        <ErrorAlert>
          <p className='center'>No Events found for this filter.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHead}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps({ params }) {
  const filterData = params.slug;
  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numMonth < 1 || numMonth > 12) {
    return {
      notFound: true
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });
  return {
    props: {
      filteredEvents,
      numYear,
      numMonth
    }
  };
}
