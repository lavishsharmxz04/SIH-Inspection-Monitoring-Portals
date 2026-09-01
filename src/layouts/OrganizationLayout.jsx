import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

export const OrganizationLayout = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getPageInfo = () => {
    const path = location.pathname;
    if (path.includes('teams')) {
      return { title: 'Operational Field Teams & Audit Personnel', breadcrumbs: ['Organization', 'Team Management'] };
    }
    if (path.includes('inspections')) {
      return { title: 'Field Inspections & Evidence Archive', breadcrumbs: ['Organization', 'Inspections'] };
    }
    if (path.includes('reports')) {
      return { title: 'Departmental Compliance Reports', breadcrumbs: ['Organization', 'Reports'] };
    }
    return { title: 'Nodal Organization Inspection Command', breadcrumbs: ['Organization', 'Dashboard'] };
  };

  const { title, breadcrumbs } = getPageInfo();

  return (
    <div className="portal-layout">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="portal-mobile-backdrop active"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        role="ORGANIZATION"
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="portal-main">
        <Topbar
          pageTitle={title}
          breadcrumbs={breadcrumbs}
          openMobile={() => setIsMobileOpen(true)}
        />

        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
