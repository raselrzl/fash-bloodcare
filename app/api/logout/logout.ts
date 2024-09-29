// pages/api/logout.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Clear the authToken cookie by setting it with an expiry in the past
    const response = NextResponse.json({ message: 'Logout successful' });

    // Set the authToken cookie to expire immediately
    response.cookies.set('authToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: -1, // Immediately expire the cookie
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
