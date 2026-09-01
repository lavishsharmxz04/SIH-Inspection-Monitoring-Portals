import React, { useState } from 'react';
import { ClipboardCheck, MapPin, Calendar, Users, Shield, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { getOrganizations, getTeams } from '../../services/mockService';

export const CreateInspectionModal = ({ isOpen, onClose, onSubmit, defaultOrgId = null }) => {
  const orgs = getOrganizations();
  const allTeams = getTeams();

  const [formData, setFormData] = useState({
    id: `INSP-${Math.floor(2400 + Math.random() * 900)}`,
    title: '',
    site: '',
    orgId: defaultOrgId || (orgs[0] ? orgs[0].id : 'ORG-001'),
    organization: defaultOrgId
      ? orgs.find((o) => o.id === defaultOrgId)?.name || 'National Infrastructure Authority'
      : orgs[0]?.name || 'National Infrastructure Authority',
    teamId: allTeams[0] ? allTeams[0].id : 'TM-101',
    team: allTeams[0] ? `${allTeams[0].name} (${allTeams[0].id})` : 'Northern Inspection Team (TM-101)',
    inspector: allTeams[0] ? allTeams[0].teamLead : 'Er. Sandeep Chauhan',
    scheduledDate: new Date().toISOString().split('T')[0],
    location: '',
    geoCoordinates: '28.6139° N, 77.2090° E',
    priority: 'High',
    status: 'Scheduled',
    category: 'Civil & Public Infrastructure',
    description: ''
  });

  const handleOrgChange = (e) => {
    const orgId = e.target.value;
    const selectedOrg = orgs.find((o) => o.id === orgId);
    const orgTeams = allTeams.filter((t) => t.orgId === orgId);
    const firstTeam = orgTeams[0] || allTeams[0];

    setFormData((prev) => ({
      ...prev,
      orgId,
      organization: selectedOrg?.name || prev.organization,
      teamId: firstTeam ? firstTeam.id : prev.teamId,
      team: firstTeam ? `${firstTeam.name} (${firstTeam.id})` : prev.team,
      inspector: firstTeam ? firstTeam.teamLead : prev.inspector
    }));
  };

  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    const selectedTeam = allTeams.find((t) => t.id === teamId);
    setFormData((prev) => ({
      ...prev,
      teamId,
      team: selectedTeam ? `${selectedTeam.name} (${selectedTeam.id})` : prev.team,
      inspector: selectedTeam ? selectedTeam.teamLead : prev.inspector
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuggestCoordinates = () => {
    // Generate realistic coordinates in Indian subcontinent
    const lat = (12.0 + Math.random() * 16.0).toFixed(4);
    const lng = (73.0 + Math.random() * 14.0).toFixed(4);
    setFormData((prev) => ({
      ...prev,
      geoCoordinates: `${lat}° N, ${lng}° E`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.site || !formData.location) {
      alert('Please fill the Title, Site Name, and Location.');
      return;
    }

    const newInsp = {
      ...formData,
      date: formData.scheduledDate,
      findingsCount: 0,
      openIssuesCount: 0,
      findings: [],
      evidence: {
        photos: [],
        documents: [],
        gpsData: {
          latitude: formData.geoCoordinates.split(',')[0]?.trim() || '28.6139 N',
          longitude: formData.geoCoordinates.split(',')[1]?.trim() || '77.2090 E',
          accuracy: '± 2.0 meters',
          timestamp: `${formData.scheduledDate} 10:00:00 IST`,
          device: 'NIC Geo-Tagging Kit G-90'
        },
        notes: formData.description || 'Pre-inspection mandate registered.'
      },
      timeline: [
        {
          step: 'Created',
          timestamp: `${new Date().toISOString().split('T')[0]} 09:30`,
          by: 'DOJS Central Cell',
          note: 'Inspection order generated per Annual Quality Framework'
        },
        {
          step: 'Assigned',
          timestamp: `${new Date().toISOString().split('T')[0]} 11:00`,
          by: formData.organization,
          note: `Assigned to ${formData.team}`
        },
        {
          step: 'Scheduled',
          timestamp: `${new Date().toISOString().split('T')[0]} 14:00`,
          by: formData.inspector,
          note: `Field deployment fixed for ${formData.scheduledDate}`
        }
      ]
    };

    onSubmit(newInsp);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Official Inspection"
      subtitle="Dispatch field audit mandate with location geo-tagging and team allocation"
      size="lg"
      footer={
        <>
          <button type="button" className="gov-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="gov-btn-primary" onClick={handleSubmit}>
            Authorize &amp; Schedule Inspection
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Audit Title <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              className="form-control"
              placeholder="e.g. Primary Health Centre Cold-Chain & Bio-Waste Audit"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Inspection ID</label>
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
              Target Facility / Site Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="site"
              required
              className="form-control"
              placeholder="e.g. Community Health Centre Complex"
              value={formData.site}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category / Domain</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Education Infrastructure">Education Infrastructure</option>
              <option value="Healthcare & Public Safety">Healthcare &amp; Public Safety</option>
              <option value="Road & Highway Infrastructure">Road &amp; Highway Infrastructure</option>
              <option value="Digital Infrastructure">Digital Infrastructure</option>
              <option value="Water Distribution & Utilities">Water Distribution &amp; Utilities</option>
              <option value="Environmental & Waste Compliance">Environmental &amp; Waste Compliance</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Responsible Organization</label>
            <select
              name="orgId"
              className="form-control"
              value={formData.orgId}
              onChange={handleOrgChange}
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} ({o.id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assigned Field Team</label>
            <select
              name="teamId"
              className="form-control"
              value={formData.teamId}
              onChange={handleTeamChange}
            >
              {allTeams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — Lead: {t.teamLead}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">Scheduled Date</label>
            <input
              type="date"
              name="scheduledDate"
              className="form-control"
              value={formData.scheduledDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Priority Level</label>
            <select
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
              <option value="Critical">Critical (Immediate Audit)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Initial Status</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending Assignment</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress (Field Team Active)</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Physical Location &amp; Address <span className="required">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              className="form-control"
              placeholder="e.g. Sector 14, Pimpri-Chinchwad, Pune - 411033"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                GPS Geo-Coordinates (Lat, Lng)
              </label>
              <button
                type="button"
                onClick={handleSuggestCoordinates}
                style={{ fontSize: '10.5px', background: 'none', border: 'none', color: 'var(--blue-gov)', cursor: 'pointer', fontWeight: 600 }}
              >
                Auto-Fix Coordinates
              </button>
            </div>
            <input
              type="text"
              name="geoCoordinates"
              className="form-control"
              placeholder="e.g. 18.6279° N, 73.8009° E"
              value={formData.geoCoordinates}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Audit Scope &amp; Special Directives</label>
          <textarea
            name="description"
            rows={2}
            className="form-control"
            placeholder="Specify items to check (e.g. fire NOC, structural integrity, bio-medical waste compliance, SCADA telemetry)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </form>
    </Modal>
  );
};
