// src/components/StudentManagement.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const StudentManagementPage: React.FC = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Student Profiles Button */}
        <Link
          to="/profiles"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-lg font-medium">Student Profiles</span>
        </Link>

        {/* Admissions Button */}
        <Link
          to="/admissions"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-lg font-medium">Admissions</span>
        </Link>

        {/* Promotion/Transfer Button */}
        <Link
          to="/promotion-transfer"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span className="text-lg font-medium">Promotion/Transfer</span>
        </Link>

        {/* Attendance Tracking Button */}
        <Link
          to="/attendance-tracking"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-lg font-medium">Attendance Tracking</span>
        </Link>

        {/* Discipline Records Button */}
        <Link
          to="/discipline-records"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-lg font-medium">Discipline Records</span>
        </Link>
      </div>
    </main>
  );
};

export default StudentManagementPage;
