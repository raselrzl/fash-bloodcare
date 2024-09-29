// app/api/adminuser/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { isAdmin } = await req.json(); // Expect { isAdmin: boolean } in the body

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const { client } = await connectToDatabase();
    const dbName = 'ZIRRAH'; // Your database name
    const database = client.db(dbName);
    const collection = database.collection('admin');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isAdmin } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Error updating user', error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const { client } = await connectToDatabase();
    const dbName = 'ZIRRAH'; // Your database name
    const database = client.db(dbName);
    const collection = database.collection('admin');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user', error: (error as Error).message }, { status: 500 });
  }
}
