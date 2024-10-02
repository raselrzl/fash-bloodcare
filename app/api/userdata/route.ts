import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try { 
    const { client } = await connectToDatabase();
    const dbName = 'ZIRRAH';
    const database = client.db(dbName);
    const collection = database.collection('bloodgroup');
    console.log('Database connection established.');
    const users = await collection.find({}).toArray();
    console.log(users);
    const response = NextResponse.json(users);
    response.headers.set('Cache-Control', 'no-store'); // No caching

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return NextResponse.json(
      { message: 'Error fetching data', error: (error as Error).message },
      { status: 500 }
    );
  }
}
