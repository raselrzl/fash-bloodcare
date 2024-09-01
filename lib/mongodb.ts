import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

let client: MongoClient | null = null;
let database: Db | null = null;

export async function connectToDatabase() {
  if (client && database) {
    return { client, database };
  }

  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(uri); // No need for `useNewUrlParser` and `useUnifiedTopology`
    await client.connect();
    console.log('Connected to MongoDB');
    database = client.db('ZIRRAH'); // Replace with your database name
    return { client, database };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
    client = null;
    database = null;
  }
}
