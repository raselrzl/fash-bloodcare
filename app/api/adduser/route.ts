// app/api/adduser/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { database } = await connectToDatabase();
    const collection = database.collection('bloodgroup'); // Replace with your collection name

    const userData = await request.json(); // Parse the incoming JSON data

    // Check if phone number or NID already exists
    const existingUser = await collection.findOne({
      $or: [
        { phoneNumber: userData.phoneNumber },
        { nidNumber: userData.nidNumber },
        { email: userData.email }
      ]
    });

    if (existingUser) {
      if (existingUser.phoneNumber === userData.phoneNumber) {
        return NextResponse.json(
          { message: 'Phone number is already registered. Try a new phone number.' },
          { status: 400 }
        );
      }

      if (existingUser.nidNumber === userData.nidNumber) {
        return NextResponse.json(
          { message: 'NID number is already registered, Try a new NID.' },
          { status: 400 }
        );
      }

      if (existingUser.email === userData.email) {
        return NextResponse.json(
          { message: 'Email is already registered, Try a new Email.' },
          { status: 400 }
        );
      }
    }

    // Insert data into the MongoDB collection
    const result = await collection.insertOne(userData);

    console.log('User inserted:', result);

    return NextResponse.json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Failed to add user:', error);
    return NextResponse.json(
      { message: 'Failed to add user', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await disconnectFromDatabase();
  }
}
