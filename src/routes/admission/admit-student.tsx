import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, UserPlus, Upload } from 'lucide-react';

// List of grades and countries for dropdowns
const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const countries = ['Bahamas', 'United States', 'Canada'];

const steps = [
  'Personal Details',
  'Parent/Guardian Details',
  'Academic Details',
  'Additional Information',
];

interface ProfileImageUploaderProps {
  imageUrl: string;
  error?: string;
  onImageChange: (file: File | null) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ imageUrl, error, onImageChange }) => {
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
    if (!['image/jpeg', 'image/jpg'].includes(file.type) || file.size > 3 * 1024 * 1024) {
      onImageChange(null);
      return;
    }
    onImageChange(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <img
          src={imageUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
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
            <circle cx="12" cy="12" r="10" fill="#06b6d4" />
            <path d="M15.75 13.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Zm-3.75-7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="white" />
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
      <p className="text-xs text-slate-500 mt-1">* Only JPEG and JPG supported. * Max 3 MB Upload</p>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

interface FormData {
  profileImage: string | File;
  profileImagePreview: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  parentName: string;
  parentContact: string;
  parentEmail: string;
  streetAddress: string;
  cityName: string;
  country: string;
  pinCode: string;
  previousSchool: string;
  medicalConditions: string;
  documents: File | null;
}

interface AdmitStudentCardProps {
  onClick?: () => void;
}

const AdmitStudentCard: React.FC<AdmitStudentCardProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    profileImage: '',
    profileImagePreview: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    parentName: '',
    parentContact: '',
    parentEmail: '',
    streetAddress: '',
    cityName: '',
    country: '',
    pinCode: '',
    previousSchool: '',
    medicalConditions: '',
    documents: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({
    profileImage: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    parentName: '',
    parentContact: '',
    parentEmail: '',
    streetAddress: '',
    cityName: '',
    country: '',
    pinCode: '',
    previousSchool: '',
    medicalConditions: '',
    documents: '',
  });
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleProfileImageChange = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      }));
      setErrors((prev) => ({ ...prev, profileImage: '' }));
    } else {
      setFormData((prev) => ({
        ...prev,
        profileImage: '',
        profileImagePreview: '',
      }));
      setErrors((prev) => ({ ...prev, profileImage: 'Only JPEG/JPG under 3 MB allowed' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, documents: 'Only PDF, JPEG, JPG, or PNG allowed' }));
      setFormData((prev) => ({ ...prev, documents: null }));
    } else {
      setFormData((prev) => ({ ...prev, documents: file }));
      setErrors((prev) => ({ ...prev, documents: '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (step === 0) {
      // Personal Details
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full Name is required';
        isValid = false;
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of Birth is required';
        isValid = false;
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
        isValid = false;
      }
      if (!formData.grade) {
        newErrors.grade = 'Grade is required';
        isValid = false;
      }
      if (formData.profileImage && typeof formData.profileImage !== 'string') {
        const file = formData.profileImage as File;
        if (!['image/jpeg', 'image/jpg'].includes(file.type) || file.size > 3 * 1024 * 1024) {
          newErrors.profileImage = 'Only JPEG/JPG under 3 MB allowed';
          isValid = false;
        }
      }
    } else if (step === 1) {
      // Parent/Guardian Details
      if (!formData.parentName.trim()) {
        newErrors.parentName = 'Parent Name is required';
        isValid = false;
      }
      if (!formData.parentContact.trim()) {
        newErrors.parentContact = 'Parent Contact is required';
        isValid = false;
      } else if (!/^\+?\d{10,15}$/.test(formData.parentContact.trim())) {
        newErrors.parentContact = 'Invalid phone number (10-15 digits)';
        isValid = false;
      }
      if (!formData.parentEmail.trim()) {
        newErrors.parentEmail = 'Parent Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
        newErrors.parentEmail = 'Invalid email address';
        isValid = false;
      }
    } else if (step === 2) {
      // Academic Details
      if (formData.documents && !['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(formData.documents.type)) {
        newErrors.documents = 'Only PDF, JPEG, JPG, or PNG allowed';
        isValid = false;
      }
    } else if (step === 3) {
      // Additional Information
      if (!formData.streetAddress.trim()) {
        newErrors.streetAddress = 'Street Address is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    // Personal Details
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    if (!formData.grade) {
      newErrors.grade = 'Grade is required';
      isValid = false;
    }
    if (formData.profileImage && typeof formData.profileImage !== 'string') {
      const file = formData.profileImage as File;
      if (!['image/jpeg', 'image/jpg'].includes(file.type) || file.size > 3 * 1024 * 1024) {
        newErrors.profileImage = 'Only JPEG/JPG under 3 MB allowed';
        isValid = false;
      }
    }

    // Parent/Guardian Details
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent Name is required';
      isValid = false;
    }
    if (!formData.parentContact.trim()) {
      newErrors.parentContact = 'Parent Contact is required';
      isValid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.parentContact.trim())) {
      newErrors.parentContact = 'Invalid phone number (10-15 digits)';
      isValid = false;
    }
    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Parent Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Invalid email address';
      isValid = false;
    }

    // Academic Details
    if (formData.documents && !['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(formData.documents.type)) {
      newErrors.documents = 'Only PDF, JPEG, JPG, or PNG allowed';
      isValid = false;
    }

    // Additional Information
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street Address is required';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Replace with your API call (e.g., using FormData for file uploads)
        console.log('Form Data:', formData);
        alert('Student admitted successfully! (Placeholder)');
        navigate('/students');
        if (onClick) onClick();
      } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit admission form.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/students');
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Personal Details</h3>
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
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.dateOfBirth ? 'border-red-500' : ''
                  }`}
                  placeholder="mm/dd/yyyy"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === 'Male'}
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
                      checked={formData.gender === 'Female'}
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
                      checked={formData.gender === 'Other'}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer"
                    />
                    Other
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
              <div>
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Grade Applying For <span className="text-red-500">*</span>
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.grade ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select Grade</option>
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Parent/Guardian Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="parentName"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Parent Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.parentName ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter parent name"
                />
                {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
              </div>
              <div>
                <label
                  htmlFor="parentContact"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Parent Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="parentContact"
                  name="parentContact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.parentContact ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter contact number"
                />
                {errors.parentContact && <p className="text-red-500 text-xs mt-1">{errors.parentContact}</p>}
              </div>
              <div>
                <label
                  htmlFor="parentEmail"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Parent Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="parentEmail"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.parentEmail ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter parent email"
                />
                {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Academic Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="previousSchool"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Previous School (if applicable)
                </label>
                <input
                  type="text"
                  id="previousSchool"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter previous school name"
                />
              </div>
              <div>
                <label
                  htmlFor="documents"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Upload Documents (e.g., Birth Certificate, Transcripts)
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="documents"
                    className="cursor-pointer bg-cyan-500 text-white px-3 py-1.5 rounded hover:bg-cyan-600 flex items-center"
                  >
                    <Upload size={16} className="mr-2" />
                    Choose File
                  </label>
                  <span className="ml-3 text-sm text-slate-600 dark:text-slate-400">
                    {formData.documents ? formData.documents.name : 'No file chosen'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">* Only PDF, JPEG, JPG, or PNG supported</p>
                {errors.documents && <p className="text-red-500 text-xs mt-1">{errors.documents}</p>}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700 ${
                    errors.streetAddress ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter street address"
                  rows={4}
                />
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
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
              <div>
                <label
                  htmlFor="medicalConditions"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Medical Conditions (if any)
                </label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-700"
                  placeholder="Enter medical conditions"
                  rows={4}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-cyan-500" />
          <h2 className="text-xl font-semibold tracking-wide text-slate-800 dark:text-slate-100">
            ADMIT NEW STUDENT
          </h2>
        </div>
        <nav className="text-slate-400 dark:text-slate-400 text-sm flex items-center gap-1">
          <a href="/students" className="hover:underline">
            Students
          </a>
          <span>/</span>
          <span className="text-primary font-medium">Admit New</span>
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
            ) : (
              <div />
            )}
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
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 rounded px-3 py-1.5 text-white transition ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'
                  }`}
                >
                  <Save size={16} />
                  {isSubmitting ? 'Submitting...' : 'Admit Student'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmitStudentCard;