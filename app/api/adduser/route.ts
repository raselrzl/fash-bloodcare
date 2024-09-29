import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const dbName = 'ZIRRAH'; // Define your database name here

export async function POST(request: Request) {
  try {
    const { client } = await connectToDatabase(); // Get the client only
    const database = client.db(dbName); // Specify the database name
    const collection = database.collection('bloodgroup'); // Specify the collection

    const userData = await request.json(); // Parse the incoming JSON data

    // Get the current date
    const todaysDate = new Date();
    
    // Calculate the difference in months between today's date and dateOfLastDonation
    const lastDonationDate = new Date(userData.dateOfLastDonation);
    const diffTime = todaysDate.getTime() - lastDonationDate.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30); // Convert time difference to months

    // Set availableDonar based on the difference
    const availableDonar = diffMonths > 4 ? 'available' : 'not available';

    // Create the complete user object to insert or update
    const completeUserData = {
      ...userData,
      todaysDate, // Add today's date
      availableDonar, // Add the availableDonar field
    };

    // Check if phone number or NID or email already exists
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
          { message: 'Phone number is already registered. Do you want to update the existing user?', updatePrompt: true, existingUser },
          { status: 200 }
        );
      }

      if (existingUser.nidNumber === userData.nidNumber) {
        return NextResponse.json(
          { message: 'NID number is already registered. Try a new NID.', status: 400 }
        );
      }

      if (existingUser.email === userData.email) {
        return NextResponse.json(
          { message: 'Email is already registered. Try a new Email.', status: 400 }
        );
      }
    }

    // Insert data into the MongoDB collection
    const result = await collection.insertOne(completeUserData);

    console.log('User inserted:', result);

    return NextResponse.json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Failed to add user:', error);
    return NextResponse.json(
      { message: 'Failed to add user', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// This new PUT handler will handle the update if the user confirms they want to update the existing record
export async function PUT(request: Request) {
  try {
    const { client } = await connectToDatabase();
    const database = client.db(dbName);
    const collection = database.collection('bloodgroup');

    const userData = await request.json();
    const { phoneNumber } = userData;

    // Update the existing user based on the phone number
    const updateResult = await collection.updateOne(
      { phoneNumber },
      { $set: userData }
    );

    if (updateResult.modifiedCount > 0) {
      return NextResponse.json({ message: 'User updated successfully' });
    } else {
      return NextResponse.json({ message: 'User update failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json(
      { message: 'Failed to update user', error: (error as Error).message },
      { status: 500 }
    );
  }
}
