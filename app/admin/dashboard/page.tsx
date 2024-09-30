// app/admin/dashboard/page.tsx
import { connectToDatabase } from '@/lib/mongodb';
import Search from '@/app/components/Search';
import { User } from '@/lib/type';

const AdminDashboard = async () => {
  try {
    // Server-side: Fetch data directly in the component
    const { client } = await connectToDatabase();
    const dbName = 'ZIRRAH';
    const database = client.db(dbName);
    const collection = database.collection<User>('bloodgroup'); // Specify the collection document type
    
    const users = await collection.find({}).toArray(); // MongoDB now knows users are of type User

    return <Search initialUsers={users} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading users: {(error as Error).message}</div>;
  }
};

export default AdminDashboard;
