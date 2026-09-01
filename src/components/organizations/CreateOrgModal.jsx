import React, { useState } from 'react';
import { Shield, KeyRound, Copy, Check, FileText, Download } from 'lucide-react';
import { Modal } from '../common/Modal';
import { generateSecureCredentials, copyToClipboard, downloadMockFile } from '../../utils/helpers';

export const CreateOrgModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: `ORG-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    shortCode: '',
    state: 'New Delhi',
    district: '',
    officialEmail: '',
    officialPhone: '',
    address: '',
    authorizedOfficer: '',
    designation: '',
    status: 'Active'
  });

  const [generatedCreds, setGeneratedCreds] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar',
    'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Lakshadweep', 'Puducherry', 'New Delhi'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && !prev.shortCode
        ? { shortCode: value.split(' ').map((w) => w[0]).slice(0, 4).join('').toUpperCase() }
        : {})
    }));
  };

  const handleGeneratePreview = () => {
    if (!formData.name) {
      alert('Please enter the Organization Name first.');
      return;
    }
    const creds = generateSecureCredentials(formData.name, formData.shortCode);
    setGeneratedCreds(creds);
  };

  const handleCopy = async (text, idx) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleDownloadCredentialsSlip = () => {
    if (!generatedCreds) return;
    const content = `=====================================================
GOVERNMENT OF INDIA - DEPARTMENT OF OFFICIAL OVERSIGHT (DOJS)
AUTHORIZED CREDENTIALS ISSUANCE RECEIPT
=====================================================
Organization Name : ${formData.name}
Organization ID   : ${formData.id}
State / District  : ${formData.state} / ${formData.district || 'N/A'}
Authorized Officer: ${formData.authorizedOfficer} (${formData.designation})
Issuance Date     : ${new Date().toLocaleDateString('en-IN')}
-----------------------------------------------------
ISSUED SECURE ACCOUNTS (TWO LOGIN LICENSES):

1. ${generatedCreds[0].role}
   Username : ${generatedCreds[0].username}
   Temp Pass: ${generatedCreds[0].tempPassword}
   Access   : ${generatedCreds[0].accessLevel}

2. ${generatedCreds[1].role}
   Username : ${generatedCreds[1].username}
   Temp Pass: ${generatedCreds[1].tempPassword}
   Access   : ${generatedCreds[1].accessLevel}
-----------------------------------------------------
SECURITY ADVISORY:
Passkeys are temporary and require mandatory 2FA activation on first login.
=====================================================`;
    downloadMockFile(`${formData.id}_Official_Credentials.txt`, content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.officialEmail || !formData.authorizedOfficer) {
      alert('Please fill all mandatory fields marked with an asterisk (*).');
      return;
    }

    const credsToSave = generatedCreds || generateSecureCredentials(formData.name, formData.shortCode);

    const newOrg = {
      ...formData,
      createdDate: new Date().toISOString().split('T')[0],
      activeTeams: 1,
      totalInspections: 0,
      completedInspections: 0,
      pendingInspections: 0,
      complianceScore: 100.0,
      issuedAccounts: credsToSave.map((c) => ({
        username: c.username,
        role: c.role.includes('Nodal') ? 'Nodal Admin' : 'Field Supervisor',
        status: 'Active',
        lastLogin: 'Pending First Sign In'
      }))
    };

    onSubmit(newOrg);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register Authorized Organization"
      subtitle="Issue official departmental credentials and initialize monitoring jurisdiction"
      size="lg"
      footer={
        <>
          <button type="button" className="gov-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="gov-btn-primary" onClick={handleSubmit}>
            Complete Registration &amp; Issue Credentials
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {/* Basic Organization Info */}
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Organization Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="form-control"
              placeholder="e.g. National Infrastructure Authority"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Organization ID <span className="required">*</span>
            </label>
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

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">
              State / UT <span className="required">*</span>
            </label>
            <select
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
            >
              {indianStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">District</label>
            <input
              type="text"
              name="district"
              className="form-control"
              placeholder="e.g. Central Delhi"
              value={formData.district}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Short Acronym</label>
            <input
              type="text"
              name="shortCode"
              className="form-control"
              placeholder="e.g. NIA"
              value={formData.shortCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Official Email (.gov.in / .nic.in) <span className="required">*</span>
            </label>
            <input
              type="email"
              name="officialEmail"
              required
              className="form-control"
              placeholder="e.g. contact@dept.gov.in"
              value={formData.officialEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Official Phone</label>
            <input
              type="text"
              name="officialPhone"
              className="form-control"
              placeholder="+91 11 2345 6789"
              value={formData.officialPhone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Official Departmental Address</label>
          <textarea
            name="address"
            rows={2}
            className="form-control"
            placeholder="Official postal address of headquarters or nodal office"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Authorized Officer Details */}
        <div style={{ margin: '18px 0 10px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px' }}>
            Authorized Nodal Officer Details
          </h4>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              Authorized Officer Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="authorizedOfficer"
              required
              className="form-control"
              placeholder="e.g. Dr. Rajeshwar Sharma, IAS"
              value={formData.authorizedOfficer}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Designation</label>
            <input
              type="text"
              name="designation"
              className="form-control"
              placeholder="e.g. Director General / Commissioner"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Credentials Generation Box */}
        <div className="credentials-issuance-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>
              <KeyRound size={16} style={{ color: 'var(--blue-gov)' }} />
              Two Authorized Login Accounts will be issued to this Organization
            </h4>
            <button
              type="button"
              className="gov-btn-outline"
              onClick={handleGeneratePreview}
              style={{ fontSize: '11.5px', padding: '3px 8px' }}
            >
              Regenerate Passkeys
            </button>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '4px' }}>
            As per DOJS Governance Security Protocols, two distinct access credentials are automatically generated for each registered organization: one for the <strong>Nodal Administrator</strong> and one for the <strong>Field Operations Supervisor</strong>.
          </p>

          {(() => {
            const creds = generatedCreds || generateSecureCredentials(formData.name || 'ORG', formData.shortCode || 'DEP');
            return (
              <div>
                <div className="cred-accounts-grid">
                  {creds.map((cred, idx) => (
                    <div key={idx} className="cred-account-item">
                      <div className="cred-role">{cred.role}</div>
                      <div className="cred-row">
                        <span style={{ color: 'var(--text-muted)' }}>Username:</span>
                        <strong style={{ color: 'var(--navy-deep)' }}>{cred.username}</strong>
                      </div>
                      <div className="cred-row">
                        <span style={{ color: 'var(--text-muted)' }}>Temp Passkey:</span>
                        <strong style={{ color: 'var(--saffron-accent)' }}>{cred.tempPassword}</strong>
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {cred.accessLevel}
                      </div>

                      <div style={{ marginTop: '8px', textAlign: 'right' }}>
                        <button
                          type="button"
                          className="table-action-btn"
                          style={{ fontSize: '10.5px', padding: '2px 6px' }}
                          onClick={() => handleCopy(`Username: ${cred.username}\nPassword: ${cred.tempPassword}`, idx)}
                        >
                          {copiedIndex === idx ? <Check size={11} /> : <Copy size={11} />}
                          <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="gov-btn-outline"
                    onClick={handleDownloadCredentialsSlip}
                    style={{ fontSize: '11px', padding: '4px 10px' }}
                  >
                    <Download size={12} />
                    <span>Download Official Credentials Slip (.txt)</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </form>
    </Modal>
  );
};
