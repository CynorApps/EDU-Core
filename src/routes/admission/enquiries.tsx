import React, { useState } from 'react';
import { FileSpreadsheet, FileText, File, Printer, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdmissionRequest {
  id: number;
  student: string;
  parent: string;
  requestForClass: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  requestStatus: 'Pending' | 'Approved' | 'Rejected';
}

const AdmissionEnquiries: React.FC = () => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sample data (empty for now to match the image)
  // const admissionRequests: AdmissionRequest[] = [];
  // For demonstration, you can uncomment this sample data:
  
  const admissionRequests: AdmissionRequest[] = [
    {
      id: 1,
      student: 'John Doe',
      parent: 'Jane Doe',
      requestForClass: 'Grade 1',
      dateOfBirth: '2015-05-20',
      gender: 'Male',
      email: 'jane.doe@example.com',
      phone: '+1234567890',
      requestStatus: 'Pending',
    },
    {
      id: 2,
      student: 'Sarah Smith',
      parent: 'Tom Smith',
      requestForClass: 'Grade 2',
      dateOfBirth: '2014-08-15',
      gender: 'Female',
      email: 'tom.smith@example.com',
      phone: '+1987654321',
      requestStatus: 'Approved',
    },
  ];

  const filteredRequests = admissionRequests.filter(
    (request) =>
      request.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleExportExcel = () => {
    // Placeholder for Excel export
    alert('Exporting to Excel (Placeholder)');
  };

  const handleExportCsv = () => {
    // Placeholder for CSV export
    const csvContent = 'data:text/csv;charset=utf-8,Student,Parent,Request For Class,Date Of Birth,Gender,Email,Phone,Request Status\n' +
      paginatedRequests.map(r => `${r.student},${r.parent},${r.requestForClass},${r.dateOfBirth},${r.gender},${r.email},${r.phone},${r.requestStatus}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'admission_enquiries.csv');
    link.click();
  };

  const handleExportPdf = () => {
    // Placeholder for PDF export
    alert('Exporting to PDF (Placeholder)');
  };

  const handlePrint = () => {
    // Placeholder for Print
    window.print();
  };

  const handleApprove = (id: number) => {
    // Placeholder for Approve action
    alert(`Approving request ID ${id} (Placeholder)`);
  };

  const handleReject = (id: number) => {
    // Placeholder for Reject action
    alert(`Rejecting request ID ${id} (Placeholder)`);
  };

  const handleView = (id: number) => {
    // Placeholder for View action
    alert(`Viewing request ID ${id} (Placeholder)`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl font-semibold tracking-wide text-slate-800 dark:text-slate-100">
          ADMISSION ENQUIRIES
        </h2>
        <nav className="text-slate-400 dark:text-slate-400 text-sm flex items-center gap-1">
          <a href="/admission" className="hover:underline">
            Admission
          </a>
          <span>/</span>
          <span className="text-primary font-medium">Enquiries</span>
        </nav>
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="rounded border px-2 py-1 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 rounded bg-green-500 px-3 py-1.5 text-white hover:bg-green-600 transition"
            >
              <FileSpreadsheet size={16} />
              Excel
            </button>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 rounded bg-orange-500 px-3 py-1.5 text-white hover:bg-orange-600 transition"
            >
              <FileText size={16} />
              CSV
            </button>
            <button
              onClick={handleExportPdf}
              className="flex items-center gap-2 rounded bg-red-500 px-3 py-1.5 text-white hover:bg-red-600 transition"
            >
              <File size={16} />
              PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded bg-gray-500 px-3 py-1.5 text-white hover:bg-gray-600 transition"
            >
              <Printer size={16} />
              Print
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  #
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Student
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Parent
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Request For Class
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Date Of Birth
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Gender
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Email
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Phone
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Request Status
                </th>
                <th className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-600">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-3 text-center text-slate-500 dark:text-slate-400">
                    No records found.
                  </td>
                </tr>
              ) : (
                paginatedRequests.map((request, index) => (
                  <tr key={request.id} className="border-b border-slate-200 dark:border-slate-600">
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">{request.student}</td>
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">{request.parent}</td>
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">{request.requestForClass}</td>
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">{request.dateOfBirth}</td>
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">{request.gender}</td>
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">{request.email}</td>
                    <td className="p-3 text-sm text-slate-800 dark:text-slate-100">{request.phone}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          request.requestStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.requestStatus === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {request.requestStatus}
                      </span>
                    </td>
                    <td className="p-3 text-sm flex gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-green-500 hover:text-green-600"
                        title="Approve"
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Reject"
                      >
                        <XCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleView(request.id)}
                        className="text-blue-500 hover:text-blue-600"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {paginatedRequests.length === 0
              ? 'No records available.'
              : `Showing ${(currentPage - 1) * rowsPerPage + 1} to ${
                  (currentPage - 1) * rowsPerPage + paginatedRequests.length
                } of ${filteredRequests.length} entries`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              ←
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === totalPages || totalPages === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiries;