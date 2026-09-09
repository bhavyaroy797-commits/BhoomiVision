import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import RoleSelectPage from '../pages/RoleSelect/RoleSelectPage';
import PublicLogin from '../pages/RoleSelect/PublicLogin';
import PublicRegister from '../pages/RoleSelect/PublicRegister';
import PublicForgotPassword from '../pages/RoleSelect/PublicForgotPassword';
import PublicDashboard from '../pages/RoleSelect/PublicDashboard';
import ResearchPage from '../pages/Research/ResearchPage';
import PolicyInnovationPage from '../pages/PolicyInnovation/PolicyInnovationPage';
import LandGovernancePage from '../pages/LandGovernance/LandGovernancePage';
import GISMapsPage from '../pages/GISMaps/GISMapsPage';
import ReportsPage from '../pages/Reports/ReportsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import { RequireAuth } from '../auth/RequireAuth';
import { RequireRole } from '../auth/RequireRole';
import { ROLES } from '../utils/constants';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC AUTHENTICATION ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<RoleSelectPage />} />
        <Route path="/auth/public" element={<Navigate to="/auth/public/login" replace />} />
        <Route path="/auth/public/login" element={<PublicLogin />} />
        <Route path="/auth/public/register" element={<PublicRegister />} />
        <Route path="/auth/public/forgot-password" element={<PublicForgotPassword />} />
      </Route>

      {/* PROTECTED PUBLIC USER DASHBOARD ROUTES */}
      <Route
        element={
          <RequireAuth>
            <RequireRole allowedRoles={[ROLES.PUBLIC, ROLES.ADMIN]}>
              <DashboardLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route path="/dashboard/public" element={<PublicDashboard />} />
        <Route path="/home" element={<Navigate to="/dashboard/public" replace />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/policy-innovation" element={<PolicyInnovationPage />} />
        <Route path="/land-governance" element={<LandGovernancePage />} />
        <Route path="/gis-maps" element={<GISMapsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/grievance" element={<PublicDashboard />} />
      </Route>

      {/* FALLBACK ROUTE */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
