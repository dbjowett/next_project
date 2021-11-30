import { MongoClient } from 'mongodb';
const URL = 'mongodb+srv://dbjowett:ppa4z8QmwAOoQvk9@cluster0.rm7by.mongodb.net/events?retryWrites=true&w=majority';

export async function connectDatabase() {
  const client = await MongoClient.connect(URL);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  //find: get all comments// sort: sorts comments in desc order(id)// toArray: changes it to an array
  const comments = await db.collection(collection).find().sort(sort).toArray();

  return comments;
}
