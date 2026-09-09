import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import RoleSelectPage from '../pages/RoleSelect/RoleSelectPage';
import PublicLogin from '../pages/RoleSelect/PublicLogin';
import PublicRegister from '../pages/RoleSelect/PublicRegister';
import PublicForgotPassword from '../pages/RoleSelect/PublicForgotPassword';
import ResearcherLogin from '../pages/RoleSelect/ResearcherLogin';
import ResearcherRegister from '../pages/RoleSelect/ResearcherRegister';
import ResearcherForgotPassword from '../pages/RoleSelect/ResearcherForgotPassword';
import GISLogin from '../pages/RoleSelect/GISLogin';
import GISRegister from '../pages/RoleSelect/GISRegister';
import GISForgotPassword from '../pages/RoleSelect/GISForgotPassword';
import GovtLogin from '../pages/RoleSelect/GovtLogin';
import GovtRegister from '../pages/RoleSelect/GovtRegister';
import GovtForgotPassword from '../pages/RoleSelect/GovtForgotPassword';
import AdminLogin from '../pages/RoleSelect/AdminLogin';
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

        {/* RESEARCHER / ANALYST AUTHENTICATION ROUTES */}
        <Route path="/auth/researcher" element={<Navigate to="/auth/researcher/login" replace />} />
        <Route path="/auth/researcher/login" element={<ResearcherLogin />} />
        <Route path="/auth/researcher/register" element={<ResearcherRegister />} />
        <Route path="/auth/researcher/forgot-password" element={<ResearcherForgotPassword />} />

        {/* GIS FIELD OFFICER AUTHENTICATION ROUTES */}
        <Route path="/auth/gis" element={<Navigate to="/auth/gis/login" replace />} />
        <Route path="/auth/gis/login" element={<GISLogin />} />
        <Route path="/auth/gis/register" element={<GISRegister />} />
        <Route path="/auth/gis/forgot-password" element={<GISForgotPassword />} />

        {/* GOVT OFFICER / POLICY MAKER AUTHENTICATION ROUTES */}
        <Route path="/auth/govt" element={<Navigate to="/auth/govt/login" replace />} />
        <Route path="/auth/govt/login" element={<GovtLogin />} />
        <Route path="/auth/govt/register" element={<GovtRegister />} />
        <Route path="/auth/govt/forgot-password" element={<GovtForgotPassword />} />

        {/* SYSTEM ADMIN AUTHENTICATION ROUTES */}
        <Route path="/auth/admin" element={<Navigate to="/auth/admin/login" replace />} />
        <Route path="/auth/admin/login" element={<AdminLogin />} />
      </Route>

      {/* PROTECTED DASHBOARD ROUTES */}
      <Route
        element={
          <RequireAuth>
            <RequireRole allowedRoles={[ROLES.PUBLIC, ROLES.RESEARCHER, ROLES.GIS_OFFICER, ROLES.GOVT_OFFICER, ROLES.ADMIN]}>
              <DashboardLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route path="/dashboard/public" element={<PublicDashboard />} />
        <Route path="/dashboard/researcher" element={<ResearchPage />} />
        <Route path="/dashboard/gis-expert" element={<GISMapsPage />} />
        <Route path="/dashboard/gis" element={<GISMapsPage />} />
        <Route path="/dashboard/govt" element={<LandGovernancePage />} />
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
