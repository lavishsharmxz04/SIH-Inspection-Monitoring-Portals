import React, { useState, useEffect } from 'react';
import { OrgTable } from '../../components/organizations/OrgTable';
import { CreateOrgModal } from '../../components/organizations/CreateOrgModal';
import { OrgDetailsModal } from '../../components/organizations/OrgDetailsModal';
import { Modal } from '../../components/common/Modal';
import { Toast } from '../../components/common/Toast';
import { Badge } from '../../components/common/Badge';
import { KeyRound, Copy, Check, ShieldCheck, Download } from 'lucide-react';
import {
  getOrganizations,
  addOrganization,
  toggleOrganizationStatus
} from '../../services/mockService';
import { copyToClipboard, downloadMockFile } from '../../utils/helpers';

export const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [credentialsOrg, setCredentialsOrg] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const loadData = () => {
    setOrganizations(getOrganizations());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateOrg = (newOrg) => {
    addOrganization(newOrg);
    loadData();
    setToastMessage(`Organization "${newOrg.name}" successfully registered with 2 authorized accounts.`);
  };

  const handleToggleStatus = (orgId) => {
    const updated = toggleOrganizationStatus(orgId);
    loadData();
    const target = updated.find((o) => o.id === orgId);
    setToastMessage(`Organization access status updated to "${target?.status}".`);
  };

  const handleCopy = async (text, idx) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  const handleDownloadCredentials = (org) => {
    const accounts = org.issuedAccounts || [
      { role: 'Nodal Department Administrator', username: `${(org.shortCode || 'org').toLowerCase()}_nodal_admin`, tempPassword: 'GOV-PASS-9901' },
      { role: 'Field Operations Supervisor', username: `${(org.shortCode || 'org').toLowerCase()}_field_lead`, tempPassword: 'GOV-PASS-7842' }
    ];

    const content = `=====================================================
GOVERNMENT OF INDIA - DEPARTMENT OF OFFICIAL OVERSIGHT (DOJS)
AUTHORIZED CREDENTIALS RECEIPT
=====================================================
Organization : ${org.name} (${org.id})
State / UT   : ${org.state}
Officer      : ${org.authorizedOfficer} (${org.designation})
-----------------------------------------------------
ISSUED ACCOUNTS:
${accounts
  .map(
    (a, i) => `
Account #${i + 1}: ${a.role}
Username   : ${a.username}
Passkey    : ${a.tempPassword || 'SECURE-GOV-2026'}
Status     : ${a.status || 'Active'}
`
  )
  .join('\n')}
=====================================================`;

    downloadMockFile(`${org.id}_Issued_Credentials.txt`, content);
  };

  return (
    <div>
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      <OrgTable
        organizations={organizations}
        onViewDetails={(org) => setSelectedOrg(org)}
        onToggleStatus={handleToggleStatus}
        onViewCredentials={(org) => setCredentialsOrg(org)}
        onCreateOrg={() => setCreateModalOpen(true)}
      />

      <CreateOrgModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateOrg}
      />

      <OrgDetailsModal
        isOpen={!!selectedOrg}
        onClose={() => setSelectedOrg(null)}
        organization={selectedOrg}
      />

      {/* Credentials Viewer Modal */}
      {credentialsOrg && (
        <Modal
          isOpen={true}
          onClose={() => setCredentialsOrg(null)}
          title={`Authorized Credentials: ${credentialsOrg.name}`}
          subtitle={`Department ID: ${credentialsOrg.id} • Issued Access Licenses`}
          size="md"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <button
                type="button"
                className="gov-btn-outline"
                onClick={() => handleDownloadCredentials(credentialsOrg)}
              >
                <Download size={13} />
                <span>Download Slip (.txt)</span>
              </button>
              <button
                type="button"
                className="gov-btn-primary"
                onClick={() => setCredentialsOrg(null)}
              >
                Done
              </button>
            </div>
          }
        >
          <div>
            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '14px', fontSize: '12px' }}>
              <strong>Official Notice:</strong> Two active login accounts are maintained for each authorized organization in compliance with national digital security standards.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(credentialsOrg.issuedAccounts || [
                { role: 'Nodal Department Administrator', username: `${(credentialsOrg.shortCode || 'org').toLowerCase()}_nodal_admin`, tempPassword: 'GOV-PASS-9901', status: 'Active' },
                { role: 'Field Operations Supervisor', username: `${(credentialsOrg.shortCode || 'org').toLowerCase()}_field_lead`, tempPassword: 'GOV-PASS-7842', status: 'Active' }
              ]).map((acc, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy-deep)', fontSize: '13px' }}>{acc.role}</span>
                    <Badge status={acc.status || 'Active'} />
                  </div>

                  <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Username: </span>
                      <strong style={{ fontFamily: 'monospace', color: 'var(--blue-gov)' }}>{acc.username}</strong>
                    </div>
                    <button
                      type="button"
                      className="table-action-btn"
                      style={{ fontSize: '11px', padding: '2px 6px' }}
                      onClick={() => handleCopy(acc.username, idx)}
                    >
                      {copiedIdx === idx ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Passkey: </span>
                    <strong style={{ fontFamily: 'monospace', color: 'var(--saffron-accent)' }}>
                      {acc.tempPassword || 'SECURE-GOV-2026'}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
