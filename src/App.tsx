/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { OrganizationLayout } from './layouts/OrganizationLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Features } from './pages/public/Features';
import { HowItWorks } from './pages/public/HowItWorks';
import { Login } from './pages/auth/Login';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { OrganizationsPage } from './pages/admin/OrganizationsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

// Organization Portal Pages
import { OrgDashboard } from './pages/organization/OrgDashboard';
import { TeamsPage } from './pages/organization/TeamsPage';
import { InspectionsPage } from './pages/organization/InspectionsPage';
import { OrgReportsPage } from './pages/organization/OrgReportsPage';

// Database Initialization
import { initializeMockDatabase } from './services/mockService';

export default function App() {
  useEffect(() => {
    initializeMockDatabase();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="auth/login" element={<Login />} />
        </Route>

        {/* Central Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="organizations" element={<OrganizationsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
        </Route>

        {/* Nodal Organization Portal */}
        <Route path="/organization" element={<OrganizationLayout />}>
          <Route index element={<Navigate to="/organization/dashboard" replace />} />
          <Route path="dashboard" element={<OrgDashboard />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="inspections" element={<InspectionsPage />} />
          <Route path="reports" element={<OrgReportsPage />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

