import React, { useState, useEffect } from 'react';
import { AdminKPICards } from '../../components/dashboard/KPICards';
import { PerformanceChart } from '../../components/dashboard/PerformanceChart';
import { ActivityTimeline } from '../../components/dashboard/ActivityTimeline';
import { QuickActions, AlertsBanner } from '../../components/dashboard/QuickActions';
import { LiveGeoRadar } from '../../components/dashboard/LiveGeoRadar';
import { CreateOrgModal } from '../../components/organizations/CreateOrgModal';
import { CreateInspectionModal } from '../../components/inspections/CreateInspectionModal';
import { CreateTeamModal } from '../../components/teams/CreateTeamModal';
import { GenerateReportModal } from '../../components/reports/GenerateReportModal';
import { InspectionDetailsModal } from '../../components/inspections/InspectionDetailsModal';
import { AddFindingModal } from '../../components/inspections/AddFindingModal';
import { Toast } from '../../components/common/Toast';
import {
  getAdminStats,
  getInspections,
  getAlerts,
  addOrganization,
  addInspection,
  addTeam,
  addReport,
  updateInspectionStatus,
  addInspectionFinding
} from '../../services/mockService';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Modals state
  const [createOrgOpen, setCreateOrgOpen] = useState(false);
  const [createInspOpen, setCreateInspOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [generateReportOpen, setGenerateReportOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [addFindingInspId, setAddFindingInspId] = useState(null);

  const loadData = () => {
    setStats(getAdminStats());
    setInspections(getInspections());
    setAlerts(getAlerts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateOrg = (newOrg) => {
    addOrganization(newOrg);
    loadData();
    setToastMessage(`Organization "${newOrg.name}" registered successfully with 2 authorized accounts.`);
    setToastType('success');
  };

  const handleCreateInspection = (newInsp) => {
    addInspection(newInsp);
    loadData();
    setToastMessage(`Inspection "${newInsp.title}" scheduled successfully.`);
    setToastType('success');
  };

  const handleCreateTeam = (newTeam) => {
    addTeam(newTeam);
    loadData();
    setToastMessage(`Team "${newTeam.name}" formed and authorized.`);
    setToastType('success');
  };

  const handleGenerateReport = (newReport) => {
    addReport(newReport);
    loadData();
    setToastMessage(`Report "${newReport.title}" generated and published.`);
    setToastType('success');
  };

  const handleUpdateInspectionStatus = (inspId, newStatus, note) => {
    const updated = updateInspectionStatus(inspId, newStatus, note);
    loadData();
    setSelectedInspection(updated);
    setToastMessage(`Inspection status updated to "${newStatus}".`);
    setToastType('success');
  };

  const handleAddFinding = (inspId, findingData) => {
    const updated = addInspectionFinding(inspId, findingData);
    loadData();
    setSelectedInspection(updated);
    setToastMessage(`Finding logged to inspection #${inspId}.`);
    setToastType('success');
  };

  return (
    <div>
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />

      {/* Urgent Notice Banner */}
      {alerts.length > 0 && (
        <AlertsBanner
          alert={alerts[0]}
          onDismiss={() => setAlerts(alerts.slice(1))}
        />
      )}

      {/* KPI Cards Grid */}
      <AdminKPICards stats={stats} />

      {/* Live Geo Radar Matrix */}
      <LiveGeoRadar
        inspections={inspections}
        onSelectInspection={(insp) => setSelectedInspection(insp)}
      />

      {/* Administrative Quick Actions */}
      <QuickActions
        role="ADMIN"
        onCreateOrg={() => setCreateOrgOpen(true)}
        onCreateInspection={() => setCreateInspOpen(true)}
        onCreateTeam={() => setCreateTeamOpen(true)}
        onGenerateReport={() => setGenerateReportOpen(true)}
      />

      {/* Charts & Inspection Timeline Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <PerformanceChart title="National Inspection Activity & Monthly Target Trend" />
        <ActivityTimeline
          inspections={inspections}
          onViewDetails={(insp) => setSelectedInspection(insp)}
        />
      </div>

      {/* Modals */}
      <CreateOrgModal
        isOpen={createOrgOpen}
        onClose={() => setCreateOrgOpen(false)}
        onSubmit={handleCreateOrg}
      />

      <CreateInspectionModal
        isOpen={createInspOpen}
        onClose={() => setCreateInspOpen(false)}
        onSubmit={handleCreateInspection}
      />

      <CreateTeamModal
        isOpen={createTeamOpen}
        onClose={() => setCreateTeamOpen(false)}
        onSubmit={handleCreateTeam}
      />

      <GenerateReportModal
        isOpen={generateReportOpen}
        onClose={() => setGenerateReportOpen(false)}
        onSubmit={handleGenerateReport}
      />

      <InspectionDetailsModal
        isOpen={!!selectedInspection}
        onClose={() => setSelectedInspection(null)}
        inspection={selectedInspection}
        onUpdateStatus={handleUpdateInspectionStatus}
        onOpenAddFinding={(id) => setAddFindingInspId(id)}
      />

      <AddFindingModal
        isOpen={!!addFindingInspId}
        onClose={() => setAddFindingInspId(null)}
        inspectionId={addFindingInspId}
        onSubmit={handleAddFinding}
      />
    </div>
  );
};
