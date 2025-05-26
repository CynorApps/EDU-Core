// src/components/StudentProfiles.tsx
import React from 'react';

const StudentProfiles: React.FC = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Student Profiles</h1>
      <p>Manage student profiles here (e.g., view, add, edit, delete student records).</p>
    </main>
  );
};

export default StudentProfiles;