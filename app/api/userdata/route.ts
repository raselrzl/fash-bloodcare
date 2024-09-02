import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI); // Log MongoDB URI
    const client = await clientPromise;
    const db = client.db('ZIRRAH');
    const users = await db.collection('bloodgroup').find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { message: 'Error fetching data', error: (error as Error).message },
      { status: 500 }
    );
  }
}
