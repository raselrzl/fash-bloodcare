// \app\search\Table.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { User } from '@/lib/type'; // Adjust the path based on your actual structure
import { BASE_API_URL } from '@/lib/utils'; // Adjust the path based on your actual structure

const Table: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [bloodGroups, setBloodGroups] = useState<string[]>([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/userdata`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: User[] = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        const groups = Array.from(new Set(data.map((user) => user.bloodGroup)));
        setBloodGroups(groups);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleBloodGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const bloodGroup = event.target.value;
    setSelectedBloodGroup(bloodGroup);
    if (bloodGroup === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.bloodGroup === bloodGroup));
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          value={selectedBloodGroup}
          onChange={handleBloodGroupChange}
          className="px-4 py-2 bg-white border rounded shadow-sm"
        >
          <option value="">All Blood Groups</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">Name</th>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">Email</th>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">Phone Number</th>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">Date of Birth</th>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">Region</th>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">City</th>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">Village</th>
              <th className="py-3 px-6 bg-gray-300 text-left text-gray-800 font-semibold">Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-gray-900">{user.name}</td>
                <td className="py-3 px-6 text-gray-900">{user.email}</td>
                <td className="py-3 px-6 text-gray-900">{user.phoneNumber}</td>
                <td className="py-3 px-6 text-gray-900">{user.dateOfBirth}</td>
                <td className="py-3 px-6 text-gray-900">{user.region}</td>
                <td className="py-3 px-6 text-gray-900">{user.city}</td>
                <td className="py-3 px-6 text-gray-900">{user.village}</td>
                <td className="py-3 px-6 text-gray-900">{user.bloodGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
