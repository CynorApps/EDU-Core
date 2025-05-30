import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, RefreshCw } from "lucide-react";

interface Class {
  _id: string;
  className: string;
  division: string;
  createdAt: string;
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [className, setClassName] = useState("");
  const [division, setDivision] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const divisions = ["A", "B", "C", "D"];

  const fetchClasses = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Fetching classes from /api/classes...");
      const res = await fetch("/api/classes", { method: "GET" });
      if (!res.ok) {
        const text = await res.text();
        console.log("Fetch classes response (error):", res.status, text);
        throw new Error(`Failed to fetch classes: ${res.status} - ${text}`);
      }
      const data = await res.json();
      console.log("Classes fetched successfully:", data);
      setClasses(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Error fetching classes. Please check if the backend is running.");
      setLoading(false);
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!className || !division) {
      setFormError("Class name and division are required");
      return;
    }
    try {
      console.log("Adding class:", { className, division });
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className, division }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.log("Add class response (error):", res.status, text);
        throw new Error(`Failed to add class: ${res.status} - ${text}`);
      }
      const result = await res.json();
      console.log("Add class result:", result);
      setFormSuccess(result.message);
      setClassName("");
      setDivision("");
      fetchClasses();
    } catch (err: any) {
      setFormError(err.message || "Error adding class. Please try again.");
      console.error("Add error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      console.log("Deleting class with ID:", id);
      const res = await fetch(`/api/classes/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        console.log("Delete class response (error):", res.status, text);
        if (res.status === 404) {
          fetchClasses();
          return;
        }
        throw new Error(`Failed to delete class: ${res.status} - ${text}`);
      }
      console.log("Class deleted successfully");
      fetchClasses();
    } catch (err: any) {
      setError(err.message || "Error deleting class. Please try again.");
      console.error("Delete error:", err);
      fetchClasses();
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">CLASSES</h2>
        <nav className="text-slate-400 text-sm flex items-center gap-1">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <span> / </span>
          <span className="text-primary font-medium">Classes</span>
        </nav>
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">Add Class</h3>
          <form onSubmit={handleAddClass} className="max-w-md">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Class Name</label>
                <input
                  type="text"
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="e.g., Class 1"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Division</label>
                <select
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                >
                  <option value="" disabled>Select Division</option>
                  {divisions.map((div) => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>
            </div>
            {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
            {formSuccess && <p className="text-green-500 text-sm mb-4">{formSuccess}</p>}
            <button type="submit" className="rounded bg-cyan-500 px-3 py-1.5 text-white hover:bg-cyan-600 transition">
              Add Class
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Class List</h3>
          <button
            onClick={fetchClasses}
            className="flex items-center gap-2 rounded bg-gray-500 px-3 py-1.5 text-white hover:bg-gray-600 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading classes...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : classes.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No classes available. Add a class to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200 dark:border-slate-700 text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                  <th className="px-3 py-2 border-b dark:border-slate-600">Class Name</th>
                  <th className="px-3 py-2 border-b dark:border-slate-600">Division</th>
                  <th className="px-3 py-2 border-b dark:border-slate-600">Created At</th>
                  <th className="px-3 py-2 border-b dark:border-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls._id}>
                    <td className="px-3 py-2 border-b dark:border-slate-700">{cls.className}</td>
                    <td className="px-3 py-2 border-b dark:border-slate-700">{cls.division}</td>
                    <td className="px-3 py-2 border-b dark:border-slate-700">
                      {new Date(cls.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 border-b dark:border-slate-700">
                      <button
                        onClick={() => handleDelete(cls._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Class"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}