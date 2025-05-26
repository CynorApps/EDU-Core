// src/components/Admissions.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Interface for student admission data
interface Admission {
  id: string;
  name: string;
  applicationId: string;
  classApplied: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  applicationDate: string;
  contact: string;
}

// Sample data (replace with API call in production)
const sampleAdmissions: Admission[] = [
  {
    id: '1',
    name: 'John Doe',
    applicationId: 'APP001',
    classApplied: 'Grade 9',
    status: 'Pending',
    applicationDate: '2025-05-01',
    contact: 'john.doe@example.com',
  },
  {
    id: '2',
    name: 'Jane Smith',
    applicationId: 'APP002',
    classApplied: 'Grade 10',
    status: 'Approved',
    applicationDate: '2025-04-15',
    contact: 'jane.smith@example.com',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    applicationId: 'APP003',
    classApplied: 'Grade 8',
    status: 'Rejected',
    applicationDate: '2025-05-10',
    contact: 'alice.j@example.com',
  },
  {
    id: '4',
    name: 'Bob Brown',
    applicationId: 'APP004',
    classApplied: 'Grade 9',
    status: 'Pending',
    applicationDate: '2025-05-20',
    contact: 'bob.brown@example.com',
  },
];

const Admissions: React.FC = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for sort configuration
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Admission;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let data = [...sampleAdmissions];

    // Filter by search query
    if (searchQuery) {
      data = data.filter((admission) =>
        admission.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort data
    if (sortConfig) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchQuery, sortConfig]);

  // Handle sorting
  const requestSort = (key: keyof Admission) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key && prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Get sort indicator
  const getSortIndicator = (key: keyof Admission) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Admissions</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Admissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => requestSort('name')}
              >
                Student Name {getSortIndicator('name')}
              </th>
              <th className="p-3 text-left">Application ID</th>
              <th className="p-3 text-left">Class Applied</th>
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => requestSort('status')}
              >
                Status {getSortIndicator('status')}
              </th>
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => requestSort('applicationDate')}
              >
                Application Date {getSortIndicator('applicationDate')}
              </th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((admission) => (
              <tr
                key={admission.id}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">{admission.name}</td>
                <td className="p-3">{admission.applicationId}</td>
                <td className="p-3">{admission.classApplied}</td>
                <td
                  className={`p-3 ${
                    admission.status === 'Approved'
                      ? 'text-green-600 dark:text-green-400'
                      : admission.status === 'Rejected'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-yellow-600 dark:text-yellow-400'
                  }`}
                >
                  {admission.status}
                </td>
                <td className="p-3">{admission.applicationDate}</td>
                <td className="p-3">{admission.contact}</td>
                <td className="p-3">
                  <Link
                    to={`/student-management/admissions/${admission.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Admissions;