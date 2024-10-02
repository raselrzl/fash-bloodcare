// components/SearchCom.tsx
import React, { useEffect, useState } from "react";
import { User } from "@/lib/type";
import jsPDF from "jspdf";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  users: User[];
  error?: string | null;
  isLoading: boolean;
  refetchData: () => Promise<void>; // Function to refetch data
}

const SearchC: React.FC<Props> = ({ users: initialUsers = [], error = null, isLoading, refetchData }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState({
    name: "",
    nidNumber: "",
    village: "",
    phoneNumber: "",
    bloodGroup: "",
  });
  const [showAvailableDonors, setShowAvailableDonors] = useState(false);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Update filtered users when initial users or search parameters change
  useEffect(() => {
    const filtered = initialUsers.filter(
      (user) =>
        (search.name ? user.name.toLowerCase().includes(search.name.toLowerCase()) : true) &&
        (search.nidNumber ? user.nidNumber === search.nidNumber : true) &&
        (search.phoneNumber ? user.phoneNumber.includes(search.phoneNumber) : true) &&
        (search.bloodGroup ? user.bloodGroup === search.bloodGroup : true) &&
        (!showAvailableDonors || user.availableDonar === "available")
    );

    const sortedFiltered = filtered.sort((a, b) =>
      a.availableDonar === "available" && b.availableDonar !== "available"
        ? -1
        : b.availableDonar === "available" && a.availableDonar !== "available"
        ? 1
        : 0
    );

    setFilteredUsers(sortedFiltered);
    setCurrentPage(1);
  }, [search, showAvailableDonors, initialUsers]);

  // Function to download the filtered data as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Filtered Donor Data", 10, 10);
    doc.setFontSize(12);

    if (filteredUsers.length === 0) {
      doc.text("No donors found for the current search.", 10, 20);
    } else {
      filteredUsers.forEach((user, index) => {
        doc.text(
          `${index + 1}. Name: ${user.name}, Phone: ${user.phoneNumber}, Blood Group: ${user.bloodGroup}`,
          10,
          20 + index * 10
        );
      });
    }

    doc.save("Donors.pdf");
  };

  // Get the current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-4 px-2 overflow-x-hidden">
      <h1 className="text-2xl text-green-300 font-bold text-center m-6 px-4">
        Here is our all Super Human
      </h1>

      {/* Search Filters */}
      <div className="mb-6 px-10">
        <div className="flex flex-col justify-center md:flex-row md:space-x-2 space-y-4 md:space-y-0">
          <input
            type="text"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            placeholder="Search by Name"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
          <input
            type="text"
            value={search.phoneNumber}
            onChange={(e) => setSearch({ ...search, phoneNumber: e.target.value })}
            placeholder="Search by Phone Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
          />
        </div>
      </div>

      {/* Button to refetch the latest data */}
      <button onClick={refetchData} className="bg-primary text-white px-4 py-2 rounded">
        Update Data
      </button>

      {/* Display Users */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((user) => (
          <div key={user._id} className="bg-gray-800 p-4 rounded-lg">
            <p>Name: {user.name}</p>
            <p>Phone: {user.phoneNumber}</p>
            <p>Blood Group: {user.bloodGroup}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 ${index + 1 === currentPage ? "bg-primary" : "bg-gray-700"} text-white rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchC;
