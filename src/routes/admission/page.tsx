import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Users, FileText, HelpCircle, Printer } from 'lucide-react';

const AdmissionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Admit Student Button */}
        <button
          onClick={() => navigate('/admit-student')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <UserPlus className="w-6 h-6" />
          <span className="text-lg font-medium text-left">Admit Student</span>
        </button>

        {/* Admit Bulk Student Button */}
        <button
          onClick={() => navigate('/admit-bulk-student')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Users className="w-6 h-6" />
          <span className="text-lg font-medium text-left">Admit Bulk Student</span>
        </button>

        {/* Admission Requests Button */}
        <button
          onClick={() => navigate('/requests')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FileText className="w-6 h-6" />
          <span className="text-lg font-medium text-left">Admission Requests</span>
        </button>

        {/* Admission Enquiries Button */}
        <button
          onClick={() => navigate('/enquiries')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <HelpCircle className="w-6 h-6" />
          <span className="text-lg font-medium text-left">Admission Enquiries</span>
        </button>

        {/* Print Form Button */}
        <button
          onClick={() => navigate('/print-forms')}
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Printer className="w-6 h-6" />
          <span className="text-lg font-medium text-left">Print Form</span>
        </button>
      </div>
    </main>
  );
};

export default AdmissionPage;