import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Plus, Printer, Upload, Download, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import React from "react";

const classNames = ["All", "Class 1", "Class 2", "Class 3"];

// Example: Empty list for now, replace with API/data fetching as needed
const teachersList: Array<{
  id: number;
  employeeCode: string;
  name: string;
  inchargeClass: string;
  subjects: string;
  phone: string;
}> = [];

export default function TeachersPage() {
  const { theme } = useTheme();
  const [selectedClass, setSelectedClass] = useState("All");
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const navigate = useNavigate(); // Initialize navigate hook

  // Filtering logic
  const filteredTeachers = teachersList.filter(
    (t) =>
      (selectedClass === "All" || t.inchargeClass === selectedClass) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
        t.subjects.toLowerCase().includes(search.toLowerCase()) ||
        t.phone.includes(search))
  );

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (filteredTeachers.length === 0) return;
    if (selectedRows.length === filteredTeachers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTeachers.map((t) => t.id));
    }
  };

  // Example action handler
  const handleDeleteSelected = () => {
    // Implement delete logic here
    alert(`Deleting teachers: ${selectedRows.join(", ")}`);
    setSelectedRows([]);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl font-semibold tracking-wide text-slate-800 dark:text-slate-100">
          TEACHERS
        </h2>
        <div className="flex items-center gap-3">
          <nav className="text-slate-400 dark:text-slate-400 text-sm flex items-center gap-1">
            <Link to="/" className="hover:underline">
              Dashboard
            </Link>
            <span></span>
            <span className="text-primary font-medium">Teachers</span>
          </nav>
          <button
            onClick={() => navigate("/teachercreateform")} // Navigate on click
            className="ml-4 flex items-center gap-2 rounded bg-cyan-500 px-3 py-1.5 text-white hover:bg-cyan-600 transition"
          >
            <Plus size={16} />
            Create New
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Select Class Name
            </label>
            <select
              className="rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classNames.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {selectedRows.length > 0 && (
            <div>
              <select
                className="rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                onChange={(e) => {
                  if (e.target.value === "delete") handleDeleteSelected();
                  // Add more actions as needed
                  e.target.value = ""; // reset
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Action
                </option>
                <option value="delete">Delete</option>
                {/* Add more actions here */}
              </select>
            </div>
          )}
          <div className="flex-1 flex justify-end gap-2">
            <button className="flex items-center gap-1 rounded bg-green-200 px-3 py-1.5 text-green-800 hover:bg-green-300 transition dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-600">
              <Printer size={16} /> Print
            </button>
            <button
              className="flex items-center gap-1 rounded bg-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-400 transition dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
              disabled
            >
              <Upload size={16} /> Import
            </button>
            <button className="flex items-center gap-1 rounded bg-cyan-400 px-3 py-1.5 text-white hover:bg-cyan-500 transition dark:bg-cyan-700 dark:hover:bg-cyan-800">
              <Download size={16} /> Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 dark:border-slate-700 text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                <th className="px-3 py-2 border-b dark:border-slate-600">
                  <input
                    type="checkbox"
                    checked={
                      filteredTeachers.length > 0 &&
                      selectedRows.length === filteredTeachers.length
                    }
                    onChange={toggleAllRows}
                    disabled={filteredTeachers.length === 0}
                  />
                </th>
                <th className="px-3 py-2 border-b dark:border-slate-600">
                  Employee Code
                </th>
                <th className="px-3 py-2 border-b dark:border-slate-600">
                  Name
                </th>
                <th className="px-3 py-2 border-b dark:border-slate-600">
                  Incharge Class
                </th>
                <th className="px-3 py-2 border-b dark:border-slate-600">
                  Subjects Handling
                </th>
                <th className="px-3 py-2 border-b dark:border-slate-600">
                  Phone
                </th>
                <th className="px-3 py-2 border-b dark:border-slate-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length === 0 ? (
                <>
                  <tr>
                    <td
                      className="px-3 py-2 text-center border-b dark:border-slate-700"
                      colSpan={7}
                    >
                      <span className="text-slate-500 dark:text-slate-400">
                        No data available in table
                      </span>
                    </td>
                  </tr>
                  {/* Footer row for table structure */}
                  <tr>
                    <th className="px-3 py-2 border-t dark:border-slate-700"></th>
                    <th className="px-3 py-2 border-t dark:border-slate-700">
                      Employee Code
                    </th>
                    <th className="px-3 py-2 border-t dark:border-slate-700">
                      Name
                    </th>
                    <th className="px-3 py-2 border-t dark:border-slate-700">
                      Incharge Class
                    </th>
                    <th className="px-3 py-2 border-t dark:border-slate-700">
                      Subjects Handling
                    </th>
                    <th className="px-3 py-2 border-t dark:border-slate-700">
                      Phone
                    </th>
                    <th className="px-3 py-2 border-t dark:border-slate-700">
                      Action
                    </th>
                  </tr>
                </>
              ) : (
                filteredTeachers
                  .slice(0, entriesPerPage)
                  .map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-3 py-2 border-b dark:border-slate-700">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(teacher.id)}
                          onChange={() => toggleRow(teacher.id)}
                        />
                      </td>
                      <td className="px-3 py-2 border-b dark:border-slate-700">
                        {teacher.employeeCode}
                      </td>
                      <td className="px-3 py-2 border-b dark:border-slate-700">
                        {teacher.name}
                      </td>
                      <td className="px-3 py-2 border-b dark:border-slate-700">
                        {teacher.inchargeClass}
                      </td>
                      <td className="px-3 py-2 border-b dark:border-slate-700">
                        {teacher.subjects}
                      </td>
                      <td className="px-3 py-2 border-b dark:border-slate-700">
                        {teacher.phone}
                      </td>
                      <td className="px-3 py-2 border-b dark:border-slate-700">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => alert(`Delete teacher ${teacher.id}`)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <label
              className="text-sm text-slate-700 dark:text-slate-200"
              htmlFor="entries"
            >
              Show
            </label>
            <select
              id="entries"
              className="rounded border px-2 py-1 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-sm text-slate-700 dark:text-slate-200">
              entries
            </span>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Showing 0 to 0 of 0 entries
          </span>
          <div>
            <input
              type="text"
              className="rounded border px-2 py-1 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}