import { BASE_API_URL } from '@/lib/utils';

export default async function TotalUsersServer() {
  try {
    const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const users = await response.json();

    const userCount = users.length; // Set the total user count
    const availableDonors = users.filter((user: any) => user.availableDonar === 'available').length; // Filter available donors

    return {
      userCount,
      availableDonors,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      userCount: null,
      availableDonors: null,
      error: (error as Error).message,
    };
  }
}
