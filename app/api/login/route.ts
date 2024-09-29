// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log('Login attempt for:', email);

    // Validate the request
    if (!email || !password) {
      console.error('Missing email or password');
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Attempt to connect to the database
    const { database } = await connectToDatabase();
    if (!database) {
      console.error('Database connection failed');
      return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
    }
    console.log('Connected to the database');

    const usersCollection = database.collection('admin');

    // Find the user by email
    const user = await usersCollection.findOne({ email });
    console.log('User found:', user);  // Log the user details

    // Check if the user exists
    if (!user) {
      console.error('Invalid email');
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check password (assuming plain text for now; not recommended for production)
    if (user.password !== password) {
      console.error('Invalid password');
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      console.error('User is not an admin');
      return NextResponse.json({ message: 'Unauthorized: You are not an Admin' }, { status: 403 });
    }

    // Determine the redirect path based on user's role
    let redirectPath = '/admin/dashboard';

    if (user.isAdmin && user.superAdmin) {
      redirectPath = '/admin/dashboard/superAdmin';
    }

    // Return user data and the redirect path (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Login successful',
      user: {
        ...userWithoutPassword, // Includes superAdmin and isAdmin fields
        isAdmin: user.isAdmin,
        superAdmin: user.superAdmin
      },
      redirectPath
    }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);  // Log the error details
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
