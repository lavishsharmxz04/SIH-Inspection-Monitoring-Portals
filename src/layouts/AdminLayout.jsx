import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

export const AdminLayout = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Derive page title and breadcrumbs based on route
  const getPageInfo = () => {
    const path = location.pathname;
    if (path.includes('organizations')) {
      return { title: 'Organization Directory & Access Registry', breadcrumbs: ['DOJS Central', 'Organizations'] };
    }
    if (path.includes('reports')) {
      return { title: 'Compliance Reports & Executive Dossiers', breadcrumbs: ['DOJS Central', 'Reports & Audits'] };
    }
    return { title: 'DOJS Central Administrative Command', breadcrumbs: ['DOJS Central', 'Dashboard'] };
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
        role="ADMIN"
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
