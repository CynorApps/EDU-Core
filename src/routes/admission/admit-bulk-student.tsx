import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Class and section options
const classes = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const sections = ['A', 'B', 'C'];
const parentAccountOptions = ['YES', 'NO'];

interface FormData {
  selectedClass: string;
  selectedSection: string;
  file: File | null;
  createParentAccounts: string;
}

const AddBulkStudent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    selectedClass: '',
    selectedSection: '',
    file: null,
    createParentAccounts: 'NO',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    // Reset section if class changes
    if (name === 'selectedClass') {
      setFormData((prev) => ({ ...prev, selectedSection: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== 'text/csv') {
      setErrors((prev) => ({ ...prev, file: 'Only CSV files are allowed' }));
      setFormData((prev) => ({ ...prev, file: null }));
    } else {
      setFormData((prev) => ({ ...prev, file }));
      setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.selectedClass) {
      newErrors.selectedClass = 'Class is required';
      isValid = false;
    }
    if (!formData.selectedSection) {
      newErrors.selectedSection = 'Section is required';
      isValid = false;
    }
    if (!formData.file) {
      newErrors.file = 'Please upload a CSV file';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Replace with your API call to upload the CSV file
      console.log('Form Data:', formData);
      alert('Bulk student data imported successfully! (Placeholder)');
      navigate('/students');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to import student data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadSample = () => {
    // Placeholder for downloading a sample CSV file
    // In a real app, this would link to an actual file or generate a CSV
    const sampleCsvContent = 'FirstName,LastName,DateOfBirth,Gender,Grade,ParentName,ParentEmail\nJohn,Doe,2015-05-20,Male,Grade 1,Jane Doe,jane.doe@example.com';
    const blob = new Blob([sampleCsvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bulk_student_sample.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-wide text-slate-800 dark:text-slate-100">
            ADD BULK STUDENT
          </h2>
        </div>
        <nav className="text-slate-400 dark:text-slate-400 text-sm flex items-center gap-1">
          <a href="/students" className="hover:underline">
            Students
          </a>
          <span>/</span>
          <span className="text-primary font-medium">Add Bulk</span>
        </nav>
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="selectedClass"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Class <span className="text-red-500">*</span>
              </label>
              <select
                id="selectedClass"
                name="selectedClass"
                value={formData.selectedClass}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                  errors.selectedClass ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.selectedClass && (
                <p className="text-red-500 text-xs mt-1">{errors.selectedClass}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="selectedSection"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Section <span className="text-red-500">*</span>
              </label>
              <select
                id="selectedSection"
                name="selectedSection"
                value={formData.selectedSection}
                onChange={handleChange}
                disabled={!formData.selectedClass}
                className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                  errors.selectedSection ? 'border-red-500' : ''
                } ${!formData.selectedClass ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Select Section First</option>
                {sections.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.selectedSection && (
                <p className="text-red-500 text-xs mt-1">{errors.selectedSection}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
            >
              Upload CSV File <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".csv"
              />
              <label
                htmlFor="file"
                className="cursor-pointer bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 flex items-center"
              >
                Choose File
              </label>
              <span className="ml-3 text-sm text-slate-600 dark:text-slate-400">
                {formData.file ? formData.file.name : 'No file chosen'}
              </span>
            </div>
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
          </div>

          <div>
            <label
              htmlFor="createParentAccounts"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
            >
              Create Parent Accounts
            </label>
            <select
              id="createParentAccounts"
              name="createParentAccounts"
              value={formData.createParentAccounts}
              onChange={handleChange}
              className="w-full md:w-1/4 rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
            >
              {parentAccountOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 rounded px-3 py-1.5 text-white transition ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isSubmitting ? 'Importing...' : 'Import Student Data'}
            </button>
            <button
              type="button"
              onClick={handleDownloadSample}
              className="flex items-center gap-2 rounded bg-red-500 px-3 py-1.5 text-white hover:bg-red-600 transition"
            >
              <Download size={16} />
              Download Sample File
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-xl bg-blue-900 p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Please Follow The Instructions For Adding Bulk Student</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>At First Download Sample File.</li>
          <li>
            Open The Downloaded "bulk_student.csv" File, Enter Student Details As Written There
            (Separate File For Each Class & Section).
          </li>
          <li>Save The Edited "bulk_student.csv" File.</li>
          <li>Now Select The Class & Section Then Choose The Edited File And Choose In Upload File.</li>
        </ol>
      </div>
    </div>
  );
};

export default AddBulkStudent;