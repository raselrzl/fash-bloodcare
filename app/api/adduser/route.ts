import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Ensure this path is correct

export async function POST(request: Request) {
  try {
    const { database } = await connectToDatabase(); 
    const collection = database.collection('bloodgroup');

    // Parse incoming user data
    const userData = await request.json();

    // Get current date
    const todaysDate = new Date();

    // Logic to calculate availableDonar
    let availableDonar = '';
    if (userData.dateOfLastDonation && userData.PreviousDonation) {
      const lastDonationDate = new Date(userData.dateOfLastDonation);
      const previousDonationDate = new Date(userData.PreviousDonation);
      const diffTime = lastDonationDate.getTime() - previousDonationDate.getTime();
      const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

      availableDonar = diffMonths >= 4 ? 'available' : 'not available';
    }

    const completeUserData = {
      ...userData,
      todaysDate,
      availableDonar
    };

    // Check if phone, NID, or email already exists
    const existingUser = await collection.findOne({
      $or: [
        { phoneNumber: userData.phoneNumber },
      ]
    });

    if (existingUser) {
      if (existingUser.phoneNumber === userData.phoneNumber) {
        return NextResponse.json(
          { message: 'Phone number already registered. Update?', updatePrompt: true, existingUser },
          { status: 200 }
        );
      }
    }

    // Insert new user data
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

export async function PUT(request: Request) {
  try {
    const { database } = await connectToDatabase(); 
    const collection = database.collection('bloodgroup');

    // Parse incoming data
    const userData = await request.json();
    const { phoneNumber } = userData;

    // Update the user based on phone number
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
