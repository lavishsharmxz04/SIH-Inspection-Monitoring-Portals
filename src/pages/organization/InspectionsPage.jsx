import React, { useState, useEffect } from 'react';
import { InspectionTable } from '../../components/inspections/InspectionTable';
import { CreateInspectionModal } from '../../components/inspections/CreateInspectionModal';
import { InspectionDetailsModal } from '../../components/inspections/InspectionDetailsModal';
import { AddFindingModal } from '../../components/inspections/AddFindingModal';
import { Toast } from '../../components/common/Toast';
import {
  getInspections,
  addInspection,
  updateInspectionStatus,
  addInspectionFinding,
  getSessionUser
} from '../../services/mockService';

export const InspectionsPage = () => {
  const user = getSessionUser();
  const orgId = user?.orgId || 'ORG-001';

  const [inspections, setInspections] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [addFindingInspId, setAddFindingInspId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadData = () => {
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

  const handleUpdateStatus = (inspId, newStatus, note) => {
    const updated = updateInspectionStatus(inspId, newStatus, note);
    loadData();
    setSelectedInspection(updated);
    setToastMessage(`Inspection status updated to "${newStatus}".`);
  };

  const handleAddFinding = (inspId, findingData) => {
    const updated = addInspectionFinding(inspId, findingData);
    loadData();
    setSelectedInspection(updated);
    setToastMessage(`Finding logged for inspection #${inspId}.`);
  };

  return (
    <div>
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      <InspectionTable
        inspections={inspections}
        onViewDetails={(insp) => setSelectedInspection(insp)}
        onCreateInspection={() => setCreateModalOpen(true)}
      />

      <CreateInspectionModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateInspection}
        defaultOrgId={orgId}
      />

      <InspectionDetailsModal
        isOpen={!!selectedInspection}
        onClose={() => setSelectedInspection(null)}
        inspection={selectedInspection}
        onUpdateStatus={handleUpdateStatus}
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
