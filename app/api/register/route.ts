import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Assuming you have this in the /lib directory

// Type definition for the request body
interface UserData {
  fullName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  phoneNumber?:string;
  superAdmin?: boolean; // New field for superAdmin
}

export async function POST(req: Request) {
  try {
    const { fullName, email, phoneNumber, password, isAdmin, superAdmin }: UserData = await req.json();

    // Validate the request
    if (!fullName || !email || !password) {
      return NextResponse.json({ message: 'Full name, email, and password are required' }, { status: 400 });
    }

    // Connect to the database (ZIRRAH)
    const { database } = await connectToDatabase();
    const usersCollection = database.collection('admin'); // Use the 'admin' collection

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Create the new user object with isAdmin and superAdmin fields
    const newUser = {
      fullName,
      email,
      phoneNumber,
      password, // Storing plain text password (not recommended for production)
      isAdmin: isAdmin || false, // Default to false if not provided
      superAdmin: superAdmin || false, // Default to false if not provided
      createdAt: new Date(),
    };

    // Insert the new user into the 'admin' collection
    await usersCollection.insertOne(newUser);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
