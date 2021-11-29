import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const URL = 'mongodb+srv://dbjowett:ppa4z8QmwAOoQvk9@cluster0.rm7by.mongodb.net/events?retryWrites=true&w=majority';

  if (req.method === 'POST') {
    const data = req.body;

    if (!data || !data.input.includes('@')) {
      res.status(422).json({ message: 'Invalid Email' });
    }

    const client = await MongoClient.connect(URL);
    const db = client.db();
    await db.collection('emails').insertOne({ email: data.input });

    client.close();

    res.status(201).json({ message: 'Success' });
  } else {
    console.log('Please make a POST request to this endpoint');
  }
}
