// app/search/page.tsx
import React from 'react';
import { User } from '@/lib/type';
import { BASE_API_URL } from '@/lib/utils';
import Search from '@/components/searchServer';

interface Props {
  initialUsers: User[];
  regions: string[];
}

// Server component to fetch data
const fetchUsers = async () => {
  const response = await fetch(`${BASE_API_URL}/api/userdata`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const SearchPage: React.FC = async () => {
  try {
    const users: User[] = await fetchUsers();
    const uniqueRegions = Array.from(new Set(users.map((user) => user.region)));

    return <Search initialUsers={users} regions={uniqueRegions} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading users.</div>;
  }
};

export default SearchPage;
