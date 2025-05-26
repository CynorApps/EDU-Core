// src/components/AttendanceTracking.tsx
import React from 'react';

const AttendanceTracking: React.FC = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Attendance Tracking</h1>
      <p>Track and manage student attendance here.</p>
    </main>
  );
};

export default AttendanceTracking;