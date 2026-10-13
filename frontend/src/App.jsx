import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { RoleGuard, GuestGuard, roleHomePaths } from './utils/roleGuard';
import AppLayout from './components/layout/AppLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import HospitalsManagement from './pages/super-admin/HospitalsManagement';
import BedsManagement from './pages/super-admin/BedsManagement';
import PatientsManagement from './pages/super-admin/PatientsManagement';
import AdmissionsManagement from './pages/super-admin/AdmissionsManagement';
import AmbulancesManagement from './pages/super-admin/AmbulancesManagement';
import UsersOverview from './pages/super-admin/UsersOverview';
import SystemAnalytics from './pages/super-admin/SystemAnalytics';

// Hospital Admin Pages
import HospitalAdminDashboard from './pages/hospital-admin/Dashboard';
import HospitalAdminPatientsPage from './pages/hospital-admin/PatientsPage';
import HospitalAdminBedManagement from './pages/hospital-admin/BedManagement';
import HospitalAdminAdmissionsPage from './pages/hospital-admin/AdmissionsPage';
import HospitalAdminAmbulancePage from './pages/hospital-admin/AmbulancePage';
import HospitalAdminResourcesPage from './pages/hospital-admin/ResourcesPage';
import HospitalAdminAnalyticsPage from './pages/hospital-admin/AnalyticsPage';

// Public User Pages
import PublicUserDashboard from './pages/public-user/Dashboard';
import PublicHospitalSearch from './pages/public-user/HospitalSearch';
import PublicBedAvailability from './pages/public-user/BedAvailability';

function RootRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={roleHomePaths[role] || '/login'} replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public / Guest Route */}
      <Route
        path="/login"
        element={
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        }
      />

      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* Protected App Layout */}
      <Route element={<AppLayout />}>
        {/* Super Admin Routes */}
        <Route
          path="/super-admin"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <SuperAdminDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/super-admin/hospitals"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <HospitalsManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/super-admin/beds"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <BedsManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/super-admin/patients"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <PatientsManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/super-admin/admissions"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <AdmissionsManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/super-admin/ambulances"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <AmbulancesManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/super-admin/users"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <UsersOverview />
            </RoleGuard>
          }
        />
        <Route
          path="/super-admin/analytics"
          element={
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <SystemAnalytics />
            </RoleGuard>
          }
        />

        {/* Hospital Admin Routes */}
        <Route
          path="/hospital-admin"
          element={
            <RoleGuard allowedRoles={['HOSPITAL_ADMIN']}>
              <HospitalAdminDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/hospital-admin/patients"
          element={
            <RoleGuard allowedRoles={['HOSPITAL_ADMIN']}>
              <HospitalAdminPatientsPage />
            </RoleGuard>
          }
        />
        <Route
          path="/hospital-admin/resources"
          element={
            <RoleGuard allowedRoles={['HOSPITAL_ADMIN']}>
              <HospitalAdminResourcesPage />
            </RoleGuard>
          }
        />
        <Route
          path="/hospital-admin/beds"
          element={
            <RoleGuard allowedRoles={['HOSPITAL_ADMIN']}>
              <HospitalAdminBedManagement />
            </RoleGuard>
          }
        />
        <Route
          path="/hospital-admin/admissions"
          element={
            <RoleGuard allowedRoles={['HOSPITAL_ADMIN']}>
              <HospitalAdminAdmissionsPage />
            </RoleGuard>
          }
        />
        <Route
          path="/hospital-admin/ambulances"
          element={
            <RoleGuard allowedRoles={['HOSPITAL_ADMIN']}>
              <HospitalAdminAmbulancePage />
            </RoleGuard>
          }
        />
        <Route
          path="/hospital-admin/analytics"
          element={
            <RoleGuard allowedRoles={['HOSPITAL_ADMIN']}>
              <HospitalAdminAnalyticsPage />
            </RoleGuard>
          }
        />

        {/* Public User Routes */}
        <Route
          path="/public"
          element={
            <RoleGuard allowedRoles={['PUBLIC_USER']}>
              <PublicUserDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/public/hospitals"
          element={
            <RoleGuard allowedRoles={['PUBLIC_USER']}>
              <PublicHospitalSearch />
            </RoleGuard>
          }
        />
        <Route
          path="/public/beds"
          element={
            <RoleGuard allowedRoles={['PUBLIC_USER']}>
              <PublicBedAvailability />
            </RoleGuard>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
