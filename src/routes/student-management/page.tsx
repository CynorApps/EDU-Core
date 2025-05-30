import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserCheck, ArrowRightLeft, CalendarCheck, AlertTriangle } from 'lucide-react';

const StudentManagementPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Student Profiles Button */}
        <button
          onClick={() => navigate('/profiles')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <User className="w-6 h-6" />
          <span className="text-lg font-medium">Student Profiles</span>
        </button>

        {/* Admissions Button */}
        <button
          onClick={() => navigate('/admissions')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <UserCheck className="w-6 h-6" />
          <span className="text-lg font-medium">Admissions</span>
        </button>

        {/* Promotion/Transfer Button */}
        <button
          onClick={() => navigate('/promotion-transfer')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowRightLeft className="w-6 h-6" />
          <span className="text-lg font-medium">Promotion/Transfer</span>
        </button>

        {/* Attendance Tracking Button */}
        <button
          onClick={() => navigate('/attendance-tracking')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <CalendarCheck className="w-6 h-6" />
          <span className="text-lg font-medium">Attendance Tracking</span>
        </button>

        {/* Discipline Records Button */}
        <button
          onClick={() => navigate('/discipline-records')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="text-lg font-medium">Discipline Records</span>
        </button>
      </div>
    </main>
  );
};

export default StudentManagementPage;