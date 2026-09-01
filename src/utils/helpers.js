// Utility helpers for SIH Official Inspection & Monitoring Portal

export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true })
    };
    return new Intl.DateTimeFormat('en-IN', options).format(d);
  } catch {
    return dateString;
  }
};

export const getStatusBadgeStyle = (status) => {
  const norm = (status || '').toLowerCase();
  switch (norm) {
    case 'active':
    case 'completed':
    case 'resolved':
    case 'verified & published':
    case 'official gazette published':
      return {
        bg: '#E8F5E9',
        color: '#1B5E20',
        border: '#A5D6A7',
        label: status
      };
    case 'in progress':
    case 'action in-progress':
      return {
        bg: '#E3F2FD',
        color: '#0D47A1',
        border: '#90CAF9',
        label: status
      };
    case 'scheduled':
      return {
        bg: '#FFF8E1',
        color: '#F57F17',
        border: '#FFE082',
        label: status
      };
    case 'pending':
      return {
        bg: '#FFF3E0',
        color: '#E65100',
        border: '#FFCC80',
        label: status
      };
    case 'requires action':
    case 'critical':
      return {
        bg: '#FFEBEE',
        color: '#C62828',
        border: '#FFCDD2',
        label: status
      };
    case 'rejected':
    case 'deactivated':
    case 'suspended':
      return {
        bg: '#ECEFF1',
        color: '#455A64',
        border: '#CFD8DC',
        label: status
      };
    case 'high':
      return {
        bg: '#FBE9E7',
        color: '#D84315',
        border: '#FFAB91',
        label: status
      };
    case 'medium':
      return {
        bg: '#FFF9C4',
        color: '#F57F17',
        border: '#FFF59D',
        label: status
      };
    case 'low':
      return {
        bg: '#E8F5E9',
        color: '#2E7D32',
        border: '#C8E6C9',
        label: status
      };
    default:
      return {
        bg: '#F4F7FA',
        color: '#17212B',
        border: '#DCE3E9',
        label: status || 'Unknown'
      };
  }
};

export const generateId = (prefix = 'INSP') => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
};

export const generateSecureCredentials = (orgName, shortCode) => {
  const cleanCode = (shortCode || 'ORG').toLowerCase().replace(/[^a-z0-9]/g, '');
  const rand1 = Math.floor(100 + Math.random() * 900);
  const rand2 = Math.floor(100 + Math.random() * 900);

  return [
    {
      role: 'Nodal Officer Account (Admin)',
      username: `${cleanCode}_nodal_${rand1}`,
      tempPassword: `Gov@${cleanCode.toUpperCase()}#${rand1}*`,
      accessLevel: 'Full Organizational Oversight & Dispatch'
    },
    {
      role: 'Field Supervisor Account (Operations)',
      username: `${cleanCode}_field_${rand2}`,
      tempPassword: `Insp@${cleanCode.toUpperCase()}#${rand2}!`,
      accessLevel: 'Team & Site Inspection Verification'
    }
  ];
};

export const downloadMockFile = (filename, content, mimeType = 'text/plain') => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: mimeType });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const copyToClipboard = async (text) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};
