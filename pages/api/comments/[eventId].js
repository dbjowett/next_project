import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  const URL = 'mongodb+srv://dbjowett:ppa4z8QmwAOoQvk9@cluster0.rm7by.mongodb.net/events?retryWrites=true&w=majority';

  const client = await MongoClient.connect(URL);

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    //Validation
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId
    };
    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Success!', comment: newComment });

    console.log(newComment);
  } else if (req.method === 'GET') {
    const db = client.db();
    //find: get all comments// sort: sorts comments in desc order(id)// toArray: changes it to an array
    const comments = await db.collection('comments').find().sort({ _id: -1 }).toArray();

    res.status(201).json({ comments });
  } else {
    console.log('Please make a POST or GET request to this endpoint');
  }
  client.close();
}
