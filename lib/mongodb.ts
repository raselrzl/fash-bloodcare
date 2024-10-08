import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, database: cachedDb };
  }
  const client = new MongoClient(process.env.MONGODB_URI as string);

  await client.connect();
  const database = client.db('ZIRRAH'); 

  cachedClient = client;
  cachedDb = database;

  return { client, database };
}
