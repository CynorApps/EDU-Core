import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import React from "react";

// List of blood groups and countries for dropdowns
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const countries = ["Bahamas", "United States", "Canada"];

const steps = [
  "Personal Details",
  "Address",
  "Account Information",
  "School Details",
];

function ProfileImageUploader({
  imageUrl,
  error,
  onImageChange,
}: {
  imageUrl: string;
  error?: string;
  onImageChange: (file: File | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onImageChange(null);
      return;
    }
    // Validate type and size
    if (
      !["image/jpeg", "image/jpg"].includes(file.type) ||
      file.size > 3 * 1024 * 1024
    ) {
      onImageChange(null);
      return;
    }
    onImageChange(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <img
          src={
            imageUrl ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="Profile"
          className="object-cover w-24 h-24 rounded-full border border-slate-300 bg-white"
        />
        <button
          type="button"
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-1 border-2 border-white shadow hover:bg-cyan-600"
          aria-label="Upload Profile Image"
        >
          <svg width={24} height={24} fill="white" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#06b6d4"/>
            <path d="M15.75 13.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Zm-3.75-7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="white"/>
          </svg>
        </button>
        <input
          type="file"
          accept=".jpg,.jpeg"
          className="hidden"
          ref={fileInputRef}
          onChange={handleChange}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1">
        * Only JPEG and JPG supported. * Max 3 MB Upload
      </p>
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default function TeacherCreateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileImage: "" as string | File,
    profileImagePreview: "",
    gender: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    bloodGroup: "",
    phone: "",
    qualification: "",
    streetAddress: "",
    cityName: "",
    country: "",
    pinCode: "",
    emailAddress: "",
    username: "",
    password: "",
    confirmPassword: "",
    joiningDate: "",
    leavingDate: "",
    currentPosition: "",
    employeeCode: "",
    workingHours: "",
  });
  const [errors, setErrors] = useState({
    profileImage: "",
    gender: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    bloodGroup: "",
    phone: "",
    qualification: "",
    streetAddress: "",
    cityName: "",
    country: "",
    pinCode: "",
    emailAddress: "",
    username: "",
    password: "",
    confirmPassword: "",
    joiningDate: "",
    leavingDate: "",
    currentPosition: "",
    employeeCode: "",
    workingHours: "",
  });

  const [step, setStep] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Profile image handler with preview
  const handleProfileImageChange = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      }));
      setErrors((prev) => ({ ...prev, profileImage: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        profileImage: "",
        profileImagePreview: "",
      }));
      setErrors((prev) => ({
        ...prev,
        profileImage: "Only JPEG/JPG under 3 MB allowed",
      }));
    }
  };

  // Validation for each step
  const validateStep = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (step === 0) {
      // Personal Details
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First Name is required";
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last Name is required";
        isValid = false;
      }
      if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone.trim())) {
        newErrors.phone = "Invalid phone number (10-15 digits)";
        isValid = false;
      }
      if (
        formData.profileImage &&
        typeof formData.profileImage !== "string"
      ) {
        const file = formData.profileImage as File;
        if (
          !["image/jpeg", "image/jpg"].includes(file.type) ||
          file.size > 3 * 1024 * 1024
        ) {
          newErrors.profileImage = "Only JPEG/JPG under 3 MB allowed";
          isValid = false;
        }
      }
    } else if (step === 1) {
      // Address
      if (!formData.streetAddress.trim()) {
        newErrors.streetAddress = "Street Address is required";
        isValid = false;
      }
    } else if (step === 2) {
      // Account Information
      if (!formData.emailAddress.trim()) {
        newErrors.emailAddress = "Email Address is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
        newErrors.emailAddress = "Invalid email address";
        isValid = false;
      }
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validate all before submit
  const validateForm = () => {
    const newErrors = {
      profileImage: "",
      gender: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      bloodGroup: "",
      phone: "",
      qualification: "",
      streetAddress: "",
      cityName: "",
      country: "",
      pinCode: "",
      emailAddress: "",
      username: "",
      password: "",
      confirmPassword: "",
      joiningDate: "",
      leavingDate: "",
      currentPosition: "",
      employeeCode: "",
      workingHours: "",
    };
    let isValid = true;

    // Personal Details Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Invalid phone number (10-15 digits)";
      isValid = false;
    }
    if (
      formData.profileImage &&
      typeof formData.profileImage !== "string"
    ) {
      const file = formData.profileImage as File;
      if (
        !["image/jpeg", "image/jpg"].includes(file.type) ||
        file.size > 3 * 1024 * 1024
      ) {
        newErrors.profileImage = "Only JPEG/JPG under 3 MB allowed";
        isValid = false;
      }
    }

    // Address Validation
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street Address is required";
      isValid = false;
    }

    // Account Information Validation
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Invalid email address";
      isValid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // You may want to handle image upload here (e.g., via FormData)
      console.log("Form submitted:", formData);
      alert("Teacher created successfully! (Placeholder)");
      navigate("/teachers");
    }
  };

  const handleCancel = () => {
    navigate("/teachers");
  };

  // Render content for each step
  function renderStepContent() {
    switch (step) {
      case 0:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center md:items-start">
                <ProfileImageUploader
                  imageUrl={formData.profileImagePreview}
                  error={errors.profileImage}
                  onImageChange={handleProfileImageChange}
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer"
                    />
                    Female
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer"
                    />
                    Other
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="middleName"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter middle name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div>
                <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
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
                  maxLength={10}
                  minLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="XXXXX XXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter qualification"
                />
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Address
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.streetAddress ? "border-red-500" : ""
                  }`}
                  placeholder="Enter street address"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.streetAddress}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cityName"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  City Name
                </label>
                <input
                  type="text"
                  id="cityName"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter city name"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="pinCode"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter pin code"
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.emailAddress ? "border-red-500" : ""
                  }`}
                  placeholder="Enter email address"
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailAddress}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              School Details
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="joiningDate"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Joining Date
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div>
                <label
                  htmlFor="leavingDate"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Leaving Date
                </label>
                <input
                  type="date"
                  id="leavingDate"
                  name="leavingDate"
                  value={formData.leavingDate}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div>
                <label
                  htmlFor="currentPosition"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Current Position
                </label>
                <input
                  type="text"
                  id="currentPosition"
                  name="currentPosition"
                  value={formData.currentPosition}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter current position"
                />
              </div>
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
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter employee code"
                />
              </div>
              <div>
                <label
                  htmlFor="workingHours"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Working Hours
                </label>
                <input
                  type="text"
                  id="workingHours"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter working hours"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  }

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
          <span>/</span>
          <span className="text-primary font-medium">Create New</span>
        </nav>
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <form onSubmit={handleSubmit} noValidate>
          {renderStepContent()}

          {/* Stepper navigation */}
          <div className="mt-6 flex justify-between gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 rounded bg-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-400 transition dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
              >
                Back
              </button>
            ) : <div />}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded bg-cyan-500 px-3 py-1.5 text-white hover:bg-cyan-600 transition"
              >
                Next
              </button>
            ) : (
              <div className="flex gap-3">
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
            )}
          </div>
        </form>
      </div>
    </div>
  );
}