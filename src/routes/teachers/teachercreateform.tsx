import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import React from "react";

const classNames = ["Class 1", "Class 2", "Class 3"]; // Excluding "All" as it's a filter option

export default function TeacherCreateForm() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeCode: "",
    name: "",
    inchargeClass: "Class 1", // Default to first class
    subjects: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    employeeCode: "",
    name: "",
    inchargeClass: "",
    subjects: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      employeeCode: "",
      name: "",
      inchargeClass: "",
      subjects: "",
      phone: "",
    };
    let isValid = true;

    if (!formData.employeeCode.trim()) {
      newErrors.employeeCode = "Employee Code is required";
      isValid = false;
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.inchargeClass) {
      newErrors.inchargeClass = "Incharge Class is required";
      isValid = false;
    }
    if (!formData.subjects.trim()) {
      newErrors.subjects = "Subjects are required";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Invalid phone number (10-15 digits)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Placeholder for API call or data submission
      console.log("Form submitted:", formData);
      alert("Teacher created successfully! (Placeholder)");
      // Optionally navigate back to teachers list
      navigate("/teachers");
    }
  };

  const handleCancel = () => {
    navigate("/teachers");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl font-semibold tracking-wide text-slate-800 dark:text-slate-100">
          CREATE NEW TEACHER
        </h2>
        <nav className="text-slate-400 dark:text-slate-400 text-sm flex items-center gap-1">
          <a href="/teachers" className="hover:underline">
            Teachers
          </a>
          <span></span>
          <span className="text-primary font-medium">Create New</span>
        </nav>
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Employee Code */}
            <div>
              <label
                htmlFor="employeeCode"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Employee Code
              </label>
              <input
                type="text"
                id="employeeCode"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                  errors.employeeCode ? "border-red-500" : ""
                }`}
                placeholder="Enter employee code"
              />
              {errors.employeeCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.employeeCode}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter teacher name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Incharge Class */}
            <div>
              <label
                htmlFor="inchargeClass"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Incharge Class
              </label>
              <select
                id="inchargeClass"
                name="inchargeClass"
                value={formData.inchargeClass}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                  errors.inchargeClass ? "border-red-500" : ""
                }`}
              >
                {classNames.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.inchargeClass && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.inchargeClass}
                </p>
              )}
            </div>

            {/* Subjects */}
            <div>
              <label
                htmlFor="subjects"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Subjects Handling
              </label>
              <input
                type="text"
                id="subjects"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                  errors.subjects ? "border-red-500" : ""
                }`}
                placeholder="Enter subjects (e.g., Math, Science)"
              />
              {errors.subjects && (
                <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 rounded bg-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-400 transition dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded bg-cyan-500 px-3 py-1.5 text-white hover:bg-cyan-600 transition"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}