import EventItem from './event-item';
import classes from './event-list.module.css';

export default function EventList({ items }) {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} title={event.title} id={event.id} date={event.date} location={event.location} image={event.image} />
      ))}
    </ul>
  );
}
