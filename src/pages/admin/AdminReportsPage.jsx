import React, { useState, useEffect } from 'react';
import { ReportTable } from '../../components/reports/ReportTable';
import { GenerateReportModal } from '../../components/reports/GenerateReportModal';
import { ReportDetailsModal } from '../../components/reports/ReportDetailsModal';
import { Toast } from '../../components/common/Toast';
import { getReports, addReport } from '../../services/mockService';

export const AdminReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadData = () => {
    setReports(getReports());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerateReport = (newReport) => {
    addReport(newReport);
    loadData();
    setToastMessage(`Official Report "${newReport.title}" published successfully.`);
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
      />

      <ReportDetailsModal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
    </div>
  );
};
