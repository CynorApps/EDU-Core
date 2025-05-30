import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { Suspense, lazy } from "react";

// Lazy imports for pages
const Layout = lazy(() => import("@/routes/layout"));
const DashboardPage = lazy(() => import("@/routes/dashboard/page"));
const AdmissionPage = lazy(() => import("@/routes/admission/page"));
const AdmitStudentPage = lazy(() => import("@/routes/admission/admit-student"));
const AdmitBulkStudentPage = lazy(() => import("@/routes/admission/admit-bulk-student"));
const PrintFormPage = lazy(() => import("@/routes/admission/print-forms"));
const RequestsPage = lazy(() => import("@/routes/admission/requests"));
const EnquiriesPage = lazy(() => import("@/routes/admission/enquiries"));
const ClassPage = lazy(() => import("@/routes/class/page"));
const TeachersPage = lazy(() => import("@/routes/teachers/page"));
const TeacherCreateFormPage = lazy(() => import("@/routes/teachers/teachercreateform"));
const StudentManagementPage = lazy(() => import("@/routes/student-management/page"));
const ProfilePage = lazy(() => import("@/routes/student-management/profiles"));
const AttendanceTrackingPage = lazy(() => import("@/routes/student-management/attendance-tracking"));
const AdmissionsPage = lazy(() => import("@/routes/student-management/admissions"));
const DisciplineRecordsPage = lazy(() => import("@/routes/student-management/discipline-records"));
const PromotionTransferPage = lazy(() => import("@/routes/student-management/promotion-transfer"));
const HomeworkPage = lazy(() => import("@/routes/homework/page"));
const AttendancePage = lazy(() => import("@/routes/attendance/page"));
const PaymentPage = lazy(() => import("@/routes/payment/page"));
const LibraryPage = lazy(() => import("@/routes/library/page"));
const HostelPage = lazy(() => import("@/routes/hostel/page"));
const TransportsPage = lazy(() => import("@/routes/transports/page"));
const ReportPage = lazy(() => import("@/routes/report/page"));
const SettingsPage = lazy(() => import("@/routes/settings/page"));
const NotFoundPage = lazy(() => import("@/routes/not-found"));
const RegisterPage = lazy(() => import("@/routes/register/page"));
const LoginPage = lazy(() => import("@/routes/login/page"));

// Simulated authentication check (will be updated with real auth)
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log("Token in isAuthenticated:", token); // Debug log
  return token !== null;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  console.log("PrivateRoute - Authenticated:", authenticated); // Debug log
  return authenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        element: (
          <PrivateRoute>
            <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
              <Layout />
            </Suspense>
          </PrivateRoute>
        ),
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "admission", element: <AdmissionPage /> },
          { path: "admit-student", element: <AdmitStudentPage /> },
          { path: "admit-bulk-student", element: <AdmitBulkStudentPage /> },
          { path: "print-forms", element: <PrintFormPage /> },
          { path: "requests", element: <RequestsPage /> },
          { path: "enquiries", element: <EnquiriesPage /> },
          { path: "class", element: <ClassPage /> },
          { path: "teachers", element: <TeachersPage /> },
          { path: "teachercreateform", element: <TeacherCreateFormPage /> },
          { path: "student-management", element: <StudentManagementPage /> },
          { path: "attendance-tracking", element: <AttendanceTrackingPage /> },
          { path: "admissions", element: <AdmissionsPage /> },
          { path: "profiles", element: <ProfilePage /> },
          { path: "promotion-transfer", element: <PromotionTransferPage /> },
          { path: "discipline-records", element: <DisciplineRecordsPage /> },
          { path: "homework", element: <HomeworkPage /> },
          { path: "attendance", element: <AttendancePage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "library", element: <LibraryPage /> },
          { path: "hostel", element: <HostelPage /> },
          { path: "transports", element: <TransportsPage /> },
          { path: "report", element: <ReportPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;