import React, { useState } from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { Modal } from '../common/Modal';

export const AddFindingModal = ({ isOpen, onClose, onSubmit, inspectionId }) => {
  const [formData, setFormData] = useState({
    id: `FND-${Math.floor(10 + Math.random() * 90)}`,
    title: '',
    description: '',
    severity: 'Medium',
    status: 'Open',
    assignedPerson: 'Field Officer',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    actionTaken: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please enter Finding Title and Description.');
      return;
    }

    onSubmit(inspectionId, formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Field Finding / Non-Conformance"
      subtitle={`Inspection Reference: ${inspectionId}`}
      size="md"
      footer={
        <>
          <button type="button" className="gov-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="gov-btn-primary" onClick={handleSubmit}>
            Save Finding to Record
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Finding Title <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            className="form-control"
            placeholder="e.g. Yellow Bio-Waste Bin Liner Missing Barcode Tag"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Detailed Technical Observation <span className="required">*</span>
          </label>
          <textarea
            name="description"
            rows={3}
            required
            className="form-control"
            placeholder="Specify observed defect, non-compliance standard, and risk implications"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Severity Level</label>
            <select
              name="severity"
              className="form-control"
              value={formData.severity}
              onChange={handleChange}
            >
              <option value="Low">Low (Minor Non-Conformance)</option>
              <option value="Medium">Medium (Corrective Action Required)</option>
              <option value="High">High (Serious Compliance Breach)</option>
              <option value="Critical">Critical (Immediate Operational Hazard)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Finding Status</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Assigned Rectification Lead</label>
            <input
              type="text"
              name="assignedPerson"
              className="form-control"
              placeholder="e.g. Vinayak Patil"
              value={formData.assignedPerson}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Resolution Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Immediate Action Taken / Remedial Note</label>
          <input
            type="text"
            name="actionTaken"
            className="form-control"
            placeholder="e.g. Issued notice to vendor; temporary safety measures installed."
            value={formData.actionTaken}
            onChange={handleChange}
          />
        </div>
      </form>
    </Modal>
  );
};
