import { BASE_API_URL } from '@/lib/utils';

export async function fetchTotalUsers() {
  try {
    const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const users = await response.json();
    const userCount = users.length; // Total number of users
    const availableDonors = users.filter((user: any) => user.availableDonar === 'available').length; // Count available donors

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
