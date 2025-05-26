import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { Suspense, lazy } from "react";

// Lazy imports for pages
const Layout = lazy(() => import("@/routes/layout"));
const DashboardPage = lazy(() => import("@/routes/dashboard/page"));
const AdmissionPage = lazy(() => import("@/routes/admission/page"));
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "admission", element: <AdmissionPage /> },
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
]);

function App() {
  return (
    <ThemeProvider storageKey="theme">
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;