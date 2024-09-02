import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

const options = {
  serverSelectionTimeoutMS: 10000,
  ssl: true,
};
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let database: Db | null = null;
declare global {
  var _mongoClientPromise: Promise<MongoClient> | null;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;