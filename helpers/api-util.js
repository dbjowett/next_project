export async function getAllEvents() {
  const URL = 'https://events-168a8-default-rtdb.asia-southeast1.firebasedatabase.app/events.json';

  const res = await fetch(URL);
  const data = await res.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      date: data[key].date,
      description: data[key].description,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
      location: data[key].location,
      title: data[key].title
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
