import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2, UserPlus } from 'lucide-react';
import { Modal } from '../common/Modal';

export const CreateTeamModal = ({
  isOpen,
  onClose,
  onSubmit,
  teamToEdit = null,
  orgId = 'ORG-001',
  orgName = 'National Infrastructure Authority'
}) => {
  const [formData, setFormData] = useState({
    id: `TM-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    teamLead: '',
    leadEmail: '',
    leadPhone: '',
    department: 'Civil Infrastructure & Highways',
    region: 'North Zone',
    status: 'Active',
    currentAssignment: '',
    members: [
      { id: 'MEM-01', name: '', role: 'Team Lead / Senior Auditor', experience: '10 Years', badge: 'Certified Lead' },
      { id: 'MEM-02', name: '', role: 'Technical Specialist', experience: '5 Years', badge: 'Field Auditor' }
    ]
  });

  useEffect(() => {
    if (teamToEdit) {
      setFormData(teamToEdit);
    } else {
      setFormData({
        id: `TM-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        teamLead: '',
        leadEmail: '',
        leadPhone: '',
        department: 'Civil Infrastructure & Highways',
        region: 'North Zone',
        status: 'Active',
        currentAssignment: '',
        members: [
          { id: 'MEM-01', name: '', role: 'Team Lead / Senior Auditor', experience: '10 Years', badge: 'Certified Lead' },
          { id: 'MEM-02', name: '', role: 'Technical Specialist', experience: '5 Years', badge: 'Field Auditor' }
        ]
      });
    }
  }, [teamToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'teamLead'
        ? {
            members: prev.members.map((m, idx) =>
              idx === 0 ? { ...m, name: value } : m
            )
          }
        : {})
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      members: updatedMembers,
      ...(index === 0 && field === 'name' ? { teamLead: value } : {})
    }));
  };

  const handleAddMember = () => {
    const newId = `MEM-${String(formData.members.length + 1).padStart(2, '0')}`;
    setFormData((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { id: newId, name: '', role: 'Field Auditor', experience: '3 Years', badge: 'Inspection Tech' }
      ]
    }));
  };

  const handleRemoveMember = (index) => {
    if (formData.members.length <= 1) {
      alert('A team must have at least one assigned officer.');
      return;
    }
    const updated = formData.members.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, members: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.teamLead) {
      alert('Please fill Team Name and Team Lead.');
      return;
    }

    const submissionData = {
      ...formData,
      orgId,
      orgName,
      membersCount: formData.members.length,
      performanceRating: teamToEdit ? teamToEdit.performanceRating : 4.8,
      completedInspections: teamToEdit ? teamToEdit.completedInspections : 0,
      activeInspections: teamToEdit ? teamToEdit.activeInspections : 0
    };

    onSubmit(submissionData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={teamToEdit ? `Edit Team: ${teamToEdit.name}` : 'Form New Inspection Team'}
      subtitle="Configure multi-disciplinary team roster and regional deployment jurisdiction"
      size="lg"
      footer={
        <>
          <button type="button" className="gov-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="gov-btn-primary" onClick={handleSubmit}>
            {teamToEdit ? 'Save Team Updates' : 'Authorize & Form Team'}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Team Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="form-control"
              placeholder="e.g. Northern Inspection Team"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Team ID</label>
            <input
              type="text"
              name="id"
              required
              className="form-control"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Team Lead Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="teamLead"
              required
              className="form-control"
              placeholder="e.g. Er. Sandeep Chauhan"
              value={formData.teamLead}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department / Domain</label>
            <select
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Civil Infrastructure & Highways">Civil Infrastructure &amp; Highways</option>
              <option value="Institutional Standards & RTE Compliance">Institutional Standards &amp; RTE Compliance</option>
              <option value="Primary Healthcare Facilities">Primary Healthcare Facilities</option>
              <option value="Urban Water & Municipal Works">Urban Water &amp; Municipal Works</option>
              <option value="River Basin & Reservoir Integrity">River Basin &amp; Reservoir Integrity</option>
              <option value="Digital Infrastructure & Telemetry">Digital Infrastructure &amp; Telemetry</option>
            </select>
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">Region / Zone</label>
            <input
              type="text"
              name="region"
              className="form-control"
              placeholder="e.g. North Zone (Delhi-NCR)"
              value={formData.region}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lead Phone</label>
            <input
              type="text"
              name="leadPhone"
              className="form-control"
              placeholder="+91 98110 00000"
              value={formData.leadPhone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive / On Leave</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Current Deployment / Assignment</label>
          <input
            type="text"
            name="currentAssignment"
            className="form-control"
            placeholder="e.g. District Model School Infrastructure & Sanitation Verification"
            value={formData.currentAssignment}
            onChange={handleChange}
          />
        </div>

        {/* Team Members Roster */}
        <div style={{ marginTop: '18px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} style={{ color: 'var(--blue-gov)' }} />
              Team Members Roster ({formData.members.length})
            </h4>
            <button
              type="button"
              className="gov-btn-outline"
              onClick={handleAddMember}
              style={{ fontSize: '11.5px', padding: '3px 8px' }}
            >
              <UserPlus size={12} />
              <span>+ Add Member</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {formData.members.map((member, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 0.8fr 36px',
                  gap: '8px',
                  alignItems: 'center',
                  background: '#F8FAFC',
                  padding: '8px 10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <input
                  type="text"
                  placeholder="Full Officer Name"
                  className="form-control"
                  style={{ padding: '6px 8px', fontSize: '12.5px' }}
                  value={member.name}
                  onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Role / Specialization"
                  className="form-control"
                  style={{ padding: '6px 8px', fontSize: '12.5px' }}
                  value={member.role}
                  onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Experience / Badge"
                  className="form-control"
                  style={{ padding: '6px 8px', fontSize: '12.5px' }}
                  value={member.badge || member.experience}
                  onChange={(e) => handleMemberChange(idx, 'badge', e.target.value)}
                />
                <button
                  type="button"
                  className="table-action-btn danger"
                  onClick={() => handleRemoveMember(idx)}
                  title="Remove Member"
                  style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
};
