import React, { useState, useEffect } from 'react';
import { OrgKPICards } from '../../components/dashboard/KPICards';
import { PerformanceChart } from '../../components/dashboard/PerformanceChart';
import { ActivityTimeline } from '../../components/dashboard/ActivityTimeline';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { LiveGeoRadar } from '../../components/dashboard/LiveGeoRadar';
import { CreateInspectionModal } from '../../components/inspections/CreateInspectionModal';
import { CreateTeamModal } from '../../components/teams/CreateTeamModal';
import { GenerateReportModal } from '../../components/reports/GenerateReportModal';
import { InspectionDetailsModal } from '../../components/inspections/InspectionDetailsModal';
import { AddFindingModal } from '../../components/inspections/AddFindingModal';
import { Toast } from '../../components/common/Toast';
import {
  getOrgStats,
  getInspections,
  getSessionUser,
  addInspection,
  addTeam,
  addReport,
  updateInspectionStatus,
  addInspectionFinding
} from '../../services/mockService';

export const OrgDashboard = () => {
  const user = getSessionUser();
  const orgId = user?.orgId || 'ORG-001';
  const orgName = user?.orgName || 'National Infrastructure Authority';

  const [stats, setStats] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Modals
  const [createInspOpen, setCreateInspOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [generateReportOpen, setGenerateReportOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [addFindingInspId, setAddFindingInspId] = useState(null);

  const loadData = () => {
    setStats(getOrgStats(orgId));
    setInspections(getInspections(orgId));
  };

  useEffect(() => {
    loadData();
  }, [orgId]);

  const handleCreateInspection = (newInsp) => {
    addInspection(newInsp);
    loadData();
    setToastMessage(`Inspection "${newInsp.title}" scheduled successfully.`);
  };

  const handleCreateTeam = (newTeam) => {
    addTeam({ ...newTeam, orgId, orgName });
    loadData();
    setToastMessage(`Inspection unit "${newTeam.name}" formed and deployed.`);
  };

  const handleGenerateReport = (newReport) => {
    addReport({ ...newReport, orgId, organization: orgName });
    loadData();
    setToastMessage(`Departmental Report "${newReport.title}" compiled.`);
  };

  const handleUpdateInspectionStatus = (inspId, newStatus, note) => {
    const updated = updateInspectionStatus(inspId, newStatus, note);
    loadData();
    setSelectedInspection(updated);
    setToastMessage(`Inspection status updated to "${newStatus}".`);
  };

  const handleAddFinding = (inspId, findingData) => {
    const updated = addInspectionFinding(inspId, findingData);
    loadData();
    setSelectedInspection(updated);
    setToastMessage(`Finding logged to inspection #${inspId}.`);
  };

  return (
    <div>
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Organization Header Context Banner */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: 'var(--saffron-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AUTHORIZED JURISDICTION COMMAND
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy-deep)', margin: '2px 0 0' }}>
            {orgName} ({orgId})
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Nodal Officer: <strong>{user?.officer || 'Dr. Rajeshwar Sharma, IAS'}</strong> • Status: <span style={{ color: 'var(--green-gov)', fontWeight: 700 }}>2FA Active</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" className="gov-btn-accent" onClick={() => setCreateInspOpen(true)}>
            <span>+ Schedule Audit</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <OrgKPICards stats={stats} />

      {/* Live Radar Telemetry */}
      <LiveGeoRadar
        inspections={inspections}
        onSelectInspection={(insp) => setSelectedInspection(insp)}
      />

      {/* Quick Actions */}
      <QuickActions
        role="ORGANIZATION"
        onCreateInspection={() => setCreateInspOpen(true)}
        onCreateTeam={() => setCreateTeamOpen(true)}
        onGenerateReport={() => setGenerateReportOpen(true)}
      />

      {/* Charts & Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <PerformanceChart title={`${orgName} — Monthly Field Inspections & SLA Compliance`} />
        <ActivityTimeline
          inspections={inspections}
          onViewDetails={(insp) => setSelectedInspection(insp)}
        />
      </div>

      {/* Modals */}
      <CreateInspectionModal
        isOpen={createInspOpen}
        onClose={() => setCreateInspOpen(false)}
        onSubmit={handleCreateInspection}
        defaultOrgId={orgId}
      />

      <CreateTeamModal
        isOpen={createTeamOpen}
        onClose={() => setCreateTeamOpen(false)}
        onSubmit={handleCreateTeam}
        orgId={orgId}
        orgName={orgName}
      />

      <GenerateReportModal
        isOpen={generateReportOpen}
        onClose={() => setGenerateReportOpen(false)}
        onSubmit={handleGenerateReport}
        defaultOrgId={orgId}
        defaultOrgName={orgName}
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
