import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Users, FileText, HelpCircle, Printer } from 'lucide-react';

const AdmissionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Admit Student Card */}
        <div
          onClick={() => navigate('/admit-student')}
          className="card cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="card-header flex flex-col items-center">
            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
              <UserPlus size={26} />
            </div>
            <p className="card-title mt-2 text-center">Admit Student</p>
          </div>
        </div>

        {/* Admit Bulk Student Card */}
        <div
          onClick={() => navigate('/admit-bulk-student')}
          className="card cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="card-header flex flex-col items-center">
            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
              <Users size={26} />
            </div>
            <p className="card-title mt-2 text-center">Admit Bulk Student</p>
          </div>
        </div>

        {/* Admission Requests Card */}
        <div
          onClick={() => navigate('/requests')}
          className="card cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="card-header flex flex-col items-center">
            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
              <FileText size={26} />
            </div>
            <p className="card-title mt-2 text-center">Admission Requests</p>
          </div>
        </div>

        {/* Admission Enquiries Card */}
        <div
          onClick={() => navigate('/enquiries')}
          className="card cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="card-header flex flex-col items-center">
            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
              <HelpCircle size={26} />
            </div>
            <p className="card-title mt-2 text-center">Admission Enquiries</p>
          </div>
        </div>

        {/* Print Form Card */}
        <div
          onClick={() => navigate('/print-forms')}
          className="card cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="card-header flex flex-col items-center">
            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
              <Printer size={26} />
            </div>
            <p className="card-title mt-2 text-center">Print Form</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdmissionPage;