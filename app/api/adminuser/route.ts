import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    const dbName = 'ZIRRAH'; // Replace with your database name
    const database = client.db(dbName);
    const collection = database.collection('admin'); // Replace with your collection name

    const adminUsers = await collection.find({}).toArray();

    /* Debugging: Log fetched users */
    console.log('Fetched users:', adminUsers);

    // Create a response with cache-control headers to disable caching
    const response = NextResponse.json(adminUsers);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return NextResponse.json(
      { message: 'Error fetching data', error: (error as Error).message },
      { status: 500 }
    );
  }
}
