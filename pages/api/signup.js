import { MongoClient } from 'mongodb';
import { insertDocument, connectDatabase } from '../../helpers/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    if (!data || !data.input.includes('@')) {
      res.status(422).json({ message: 'Invalid Email' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: 'Connection to database failed' });
      return;
    }

    try {
      await insertDocument(client, 'emails', { email: data.input });
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }
    res.status(201).json({ message: 'Success' });
  } else {
    console.log('Please make a POST request to this endpoint');
  }
}
