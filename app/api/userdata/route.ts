import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    
    // Specify the database name directly in the API route
    const dbName = 'ZIRRAH'; // Replace with your database name
    const database = client.db(dbName);
    const collection = database.collection('bloodgroup'); // Replace with your collection name

    const users = await collection.find({}).toArray();

    console.log('Fetched users:', JSON.stringify(users, null, 2));

    // Create response with cache-control headers
    const response = NextResponse.json(users);
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return NextResponse.json(
      { message: 'Error fetching data', error: (error as Error).message },
      { status: 500 }
    );
  }
}
