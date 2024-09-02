import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';  // Removed disconnectFromDatabase

export async function GET() {
  try {
    const { client: mongoClient, database } = await connectToDatabase();
    const collection = database.collection('bloodgroup'); // Replace with your collection name

    // Fetch data
    const users = await collection.find({}).toArray();

    // Log the fetched data in a readable format
    console.log('Fetched users:', JSON.stringify(users, null, 2));

    // Return the JSON response
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Return a JSON response with a 500 status code and error message
    return NextResponse.json(
      { message: 'Error fetching data', error: (error as Error).message },
      { status: 500 }
    );
  }
  // Removed the finally block with disconnectFromDatabase
}