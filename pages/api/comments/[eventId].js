import { connectDatabase, getAllDocuments, insertDocument } from '../../../helpers/db-util';

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connection with database failed.' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    //Validation
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Success!', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }
  if (req.method === 'GET') {
    try {
      const comments = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments });
    } catch (err) {
      res.status(500).json({ message: 'Getting all comments failed!' });
    }
  }
  client.close();
}
