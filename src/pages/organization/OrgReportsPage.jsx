import React, { useState, useEffect } from 'react';
import { ReportTable } from '../../components/reports/ReportTable';
import { GenerateReportModal } from '../../components/reports/GenerateReportModal';
import { ReportDetailsModal } from '../../components/reports/ReportDetailsModal';
import { Toast } from '../../components/common/Toast';
import { getReports, addReport, getSessionUser } from '../../services/mockService';

export const OrgReportsPage = () => {
  const user = getSessionUser();
  const orgId = user?.orgId || 'ORG-001';
  const orgName = user?.orgName || 'National Infrastructure Authority';

  const [reports, setReports] = useState([]);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadData = () => {
    setReports(getReports(orgId));
  };

  useEffect(() => {
    loadData();
  }, [orgId]);

  const handleGenerateReport = (newReport) => {
    addReport({ ...newReport, orgId, organization: orgName });
    loadData();
    setToastMessage(`Departmental Report "${newReport.title}" published successfully.`);
  };

  return (
    <div>
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      <ReportTable
        reports={reports}
        onViewDetails={(rep) => setSelectedReport(rep)}
        onGenerateReport={() => setGenerateModalOpen(true)}
      />

      <GenerateReportModal
        isOpen={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        onSubmit={handleGenerateReport}
        defaultOrgId={orgId}
        defaultOrgName={orgName}
      />

      <ReportDetailsModal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
    </div>
  );
};
