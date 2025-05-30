import React from 'react';
import { Printer } from 'lucide-react';

interface PrintFormCardProps {
  onClick: () => void;
}

const PrintFormCard: React.FC<PrintFormCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
    >
      <div className="card-header flex flex-col items-center">
        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
          <Printer size={26} />
        </div>
        <p className="card-title mt-2 text-center">Print Form</p>
      </div>
    </div>
  );
};

export default PrintFormCard;