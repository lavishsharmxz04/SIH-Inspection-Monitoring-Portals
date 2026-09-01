// Realistic Mock Data for SIH Official Inspection & Monitoring Portal

export const initialOrganizations = [
  {
    id: 'ORG-001',
    name: 'National Infrastructure Authority',
    shortCode: 'NIA',
    state: 'New Delhi',
    district: 'New Delhi',
    officialEmail: 'contact@nia.gov.in',
    officialPhone: '+91 11 2338 4921',
    address: 'Block 4, CGO Complex, Lodhi Road, New Delhi - 110003',
    authorizedOfficer: 'Dr. Rajeshwar Sharma, IAS',
    designation: 'Director General',
    status: 'Active',
    createdDate: '2024-01-15',
    activeTeams: 6,
    totalInspections: 142,
    completedInspections: 128,
    pendingInspections: 14,
    complianceScore: 94.2,
    issuedAccounts: [
      { username: 'nia_nodal_officer', role: 'Nodal Admin', status: 'Active', lastLogin: '2026-08-31 16:45' },
      { username: 'nia_field_supervisor', role: 'Field Supervisor', status: 'Active', lastLogin: '2026-09-01 09:12' }
    ]
  },
  {
    id: 'ORG-002',
    name: 'State Education Directorate',
    shortCode: 'SED-MH',
    state: 'Maharashtra',
    district: 'Pune',
    officialEmail: 'director.edu@maharashtra.gov.in',
    officialPhone: '+91 20 2612 8840',
    address: 'Central Building, Dr. Ambedkar Road, Pune - 411001',
    authorizedOfficer: 'Smt. Anjali Kulkarni',
    designation: 'Additional Commissioner (Education)',
    status: 'Active',
    createdDate: '2024-02-10',
    activeTeams: 8,
    totalInspections: 210,
    completedInspections: 185,
    pendingInspections: 25,
    complianceScore: 89.5,
    issuedAccounts: [
      { username: 'sed_admin_pune', role: 'Nodal Admin', status: 'Active', lastLogin: '2026-09-01 08:30' },
      { username: 'sed_eval_lead', role: 'Field Supervisor', status: 'Active', lastLogin: '2026-08-30 14:15' }
    ]
  },
  {
    id: 'ORG-003',
    name: 'Urban Development Authority',
    shortCode: 'UDA-KA',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    officialEmail: 'sec.uda@karnataka.gov.in',
    officialPhone: '+91 80 2235 7100',
    address: 'Vikasa Soudha, Dr. B.R. Ambedkar Veedhi, Bengaluru - 560001',
    authorizedOfficer: 'Shri Vikramaditya Rao, IAS',
    designation: 'Principal Secretary',
    status: 'Active',
    createdDate: '2024-03-01',
    activeTeams: 5,
    totalInspections: 98,
    completedInspections: 76,
    pendingInspections: 22,
    complianceScore: 81.0,
    issuedAccounts: [
      { username: 'uda_admin_blr', role: 'Nodal Admin', status: 'Active', lastLogin: '2026-08-29 11:20' },
      { username: 'uda_metro_insp', role: 'Field Supervisor', status: 'Active', lastLogin: '2026-09-01 10:02' }
    ]
  },
  {
    id: 'ORG-004',
    name: 'Public Health Division',
    shortCode: 'PHD-UP',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    officialEmail: 'support.health@up.gov.in',
    officialPhone: '+91 522 2238 600',
    address: 'Swasthya Bhawan, Kaiserbagh, Lucknow - 226001',
    authorizedOfficer: 'Dr. Manoj Kumar Tiwari',
    designation: 'Chief Medical Inspector',
    status: 'Active',
    createdDate: '2024-04-18',
    activeTeams: 10,
    totalInspections: 320,
    completedInspections: 290,
    pendingInspections: 30,
    complianceScore: 92.8,
    issuedAccounts: [
      { username: 'phd_hq_nodal', role: 'Nodal Admin', status: 'Active', lastLogin: '2026-09-01 07:45' },
      { username: 'phd_field_lead', role: 'Field Supervisor', status: 'Active', lastLogin: '2026-08-31 17:10' }
    ]
  },
  {
    id: 'ORG-005',
    name: 'Central Water Commission',
    shortCode: 'CWC-GOI',
    state: 'New Delhi',
    district: 'South Delhi',
    officialEmail: 'sewam-cwc@nic.in',
    officialPhone: '+91 11 2610 2400',
    address: 'Sewa Bhawan, R.K. Puram, New Delhi - 110066',
    authorizedOfficer: 'Er. Sunil Narayanan',
    designation: 'Chief Engineer (Monitoring)',
    status: 'Active',
    createdDate: '2024-05-02',
    activeTeams: 4,
    totalInspections: 64,
    completedInspections: 58,
    pendingInspections: 6,
    complianceScore: 96.0,
    issuedAccounts: [
      { username: 'cwc_admin_del', role: 'Nodal Admin', status: 'Active', lastLogin: '2026-08-28 10:15' },
      { username: 'cwc_dam_insp', role: 'Field Supervisor', status: 'Active', lastLogin: '2026-08-31 15:40' }
    ]
  },
  {
    id: 'ORG-006',
    name: 'Rural Development Mission',
    shortCode: 'RDM-RJ',
    state: 'Rajasthan',
    district: 'Jaipur',
    officialEmail: 'rdm.support@rajasthan.gov.in',
    officialPhone: '+91 141 2227 450',
    address: 'Vidyut Marg, Jyoti Nagar, Jaipur - 302005',
    authorizedOfficer: 'Smt. Rekha Meena, RAS',
    designation: 'Joint Secretary',
    status: 'Deactivated',
    createdDate: '2024-06-12',
    activeTeams: 3,
    totalInspections: 45,
    completedInspections: 32,
    pendingInspections: 13,
    complianceScore: 74.5,
    issuedAccounts: [
      { username: 'rdm_jaipur_admin', role: 'Nodal Admin', status: 'Suspended', lastLogin: '2026-07-15 12:00' },
      { username: 'rdm_field_exec', role: 'Field Supervisor', status: 'Suspended', lastLogin: '2026-07-15 12:00' }
    ]
  }
];

export const initialTeams = [
  {
    id: 'TM-101',
    name: 'Northern Inspection Team',
    orgId: 'ORG-001',
    orgName: 'National Infrastructure Authority',
    teamLead: 'Er. Sandeep Chauhan',
    leadEmail: 'sandeep.c@nia.gov.in',
    leadPhone: '+91 98110 43210',
    department: 'Civil Infrastructure & Highways',
    region: 'North Zone (Delhi-NCR & Haryana)',
    status: 'Active',
    currentAssignment: 'District Highway Corridor NH-44 Quality Audit',
    membersCount: 6,
    members: [
      { id: 'MEM-01', name: 'Er. Sandeep Chauhan', role: 'Team Lead / Senior Auditor', experience: '14 Years', badge: 'Certified Civil Auditor' },
      { id: 'MEM-02', name: 'Amit Verma', role: 'Structural Engineer', experience: '8 Years', badge: 'GIS Specialist' },
      { id: 'MEM-03', name: 'Neha Singhal', role: 'Environmental Safety Inspector', experience: '6 Years', badge: 'EIA Certified' },
      { id: 'MEM-04', name: 'Rohan Joshi', role: 'Documentation & Drone Tech', experience: '4 Years', badge: 'Drone Pilot DGCA' },
      { id: 'MEM-05', name: 'Kavita Das', role: 'Material Testing Specialist', experience: '9 Years', badge: 'Lab Auditor' },
      { id: 'MEM-06', name: 'Praveen Yadav', role: 'Field Assistant', experience: '3 Years', badge: 'Field Tech' }
    ],
    completedInspections: 48,
    activeInspections: 3,
    performanceRating: 4.8
  },
  {
    id: 'TM-102',
    name: 'Central Compliance Team',
    orgId: 'ORG-002',
    orgName: 'State Education Directorate',
    teamLead: 'Prof. Ramesh K. Deshmukh',
    leadEmail: 'ramesh.deshmukh@edu.gov.in',
    leadPhone: '+91 94220 18452',
    department: 'Institutional Standards & RTE Compliance',
    region: 'Western Zone (Pune & Western Maharashtra)',
    status: 'Active',
    currentAssignment: 'District Model School Infrastructure & Sanitation Verification',
    membersCount: 5,
    members: [
      { id: 'MEM-11', name: 'Prof. Ramesh K. Deshmukh', role: 'Team Lead / Senior Evaluator', experience: '18 Years', badge: 'State Accreditation Lead' },
      { id: 'MEM-12', name: 'Dr. Sneha Jadhav', role: 'Pedagogy & Lab Evaluator', experience: '11 Years', badge: 'STEM Inspector' },
      { id: 'MEM-13', name: 'Vinayak Patil', role: 'Civil Works & Safety Assessor', experience: '7 Years', badge: 'Fire Safety Certified' },
      { id: 'MEM-14', name: 'Meera Iyer', role: 'Digital Labs & ICT Reviewer', experience: '5 Years', badge: 'ICT Auditor' },
      { id: 'MEM-15', name: 'Satish Kulkarni', role: 'Administrative Auditor', experience: '12 Years', badge: 'RTE Compliance Expert' }
    ],
    completedInspections: 62,
    activeInspections: 4,
    performanceRating: 4.9
  },
  {
    id: 'TM-103',
    name: 'Quality Assurance Team',
    orgId: 'ORG-004',
    orgName: 'Public Health Division',
    teamLead: 'Dr. Vandana Shukla',
    leadEmail: 'vandana.shukla@health.gov.in',
    leadPhone: '+91 98390 56214',
    department: 'Primary Healthcare Facilities',
    region: 'Central Zone (Lucknow & Ayodhya)',
    status: 'Active',
    currentAssignment: 'Community Health Centre Cold-Chain & Bio-Waste Audit',
    membersCount: 4,
    members: [
      { id: 'MEM-21', name: 'Dr. Vandana Shukla', role: 'Chief Health Inspector', experience: '16 Years', badge: 'NABH Assessor' },
      { id: 'MEM-22', name: 'Dr. Tariq Ahmed', role: 'Epidemiology Specialist', experience: '9 Years', badge: 'Cold Chain Lead' },
      { id: 'MEM-23', name: 'Pooja Singh', role: 'Bio-Medical Waste Auditor', experience: '6 Years', badge: 'CPCB Certified' },
      { id: 'MEM-24', name: 'Harish Chandra', role: 'Pharmacy & Inventory Officer', experience: '8 Years', badge: 'Drug Safety Auditor' }
    ],
    completedInspections: 84,
    activeInspections: 2,
    performanceRating: 4.7
  },
  {
    id: 'TM-104',
    name: 'Field Verification Team',
    orgId: 'ORG-003',
    orgName: 'Urban Development Authority',
    teamLead: 'Shri Gopinath Murthy',
    leadEmail: 'gopinath.m@uda.gov.in',
    leadPhone: '+91 98450 78231',
    department: 'Urban Water & Municipal Works',
    region: 'South Zone (Bengaluru Core & Suburbs)',
    status: 'Active',
    currentAssignment: 'Government IT Centre Power & Fibre Redundancy Check',
    membersCount: 4,
    members: [
      { id: 'MEM-31', name: 'Shri Gopinath Murthy', role: 'Lead Field Officer', experience: '15 Years', badge: 'Urban Systems Auditor' },
      { id: 'MEM-32', name: 'Ananya Hegde', role: 'Electrical Grid Engineer', experience: '7 Years', badge: 'CEA Certified' },
      { id: 'MEM-33', name: 'Pradeep Kumar', role: 'Telecom & OFC Specialist', experience: '5 Years', badge: 'Fiber Network Auditor' },
      { id: 'MEM-34', name: 'Lata Reddy', role: 'Safety Compliance Officer', experience: '9 Years', badge: 'Disaster Prep Auditor' }
    ],
    completedInspections: 35,
    activeInspections: 3,
    performanceRating: 4.6
  },
  {
    id: 'TM-105',
    name: 'Hydraulic & Dam Safety Unit',
    orgId: 'ORG-005',
    orgName: 'Central Water Commission',
    teamLead: 'Er. Bharat Bhushan',
    leadEmail: 'bharat.cwc@nic.in',
    leadPhone: '+91 98101 22987',
    department: 'River Basin & Reservoir Integrity',
    region: 'National Capital & Upper Yamuna Basin',
    status: 'Active',
    currentAssignment: 'Barrage Sluice Gate Automation Verification',
    membersCount: 5,
    members: [
      { id: 'MEM-41', name: 'Er. Bharat Bhushan', role: 'Executive Dam Engineer', experience: '20 Years', badge: 'Dam Safety Specialist' },
      { id: 'MEM-42', name: 'Deepak Saxena', role: 'Hydrologist', experience: '11 Years', badge: 'Sensor Tech' },
      { id: 'MEM-43', name: 'Mansi Tyagi', role: 'Structural Stability Auditor', experience: '8 Years', badge: 'Concrete Acoustic Tech' },
      { id: 'MEM-44', name: 'Rajendra Prasad', role: 'Telemetry Specialist', experience: '6 Years', badge: 'SCADA Auditor' },
      { id: 'MEM-45', name: 'Vijay Kumar', role: 'Operations Assistant', experience: '4 Years', badge: 'Field Tech' }
    ],
    completedInspections: 28,
    activeInspections: 1,
    performanceRating: 4.9
  }
];

export const initialInspections = [
  {
    id: 'INSP-2401',
    title: 'District Model School Infrastructure & Sanitation Verification',
    site: 'PM SHRI Government Model Senior Secondary School',
    organization: 'State Education Directorate',
    orgId: 'ORG-002',
    team: 'Central Compliance Team (TM-102)',
    teamId: 'TM-102',
    inspector: 'Prof. Ramesh K. Deshmukh',
    date: '2026-08-25',
    scheduledDate: '2026-08-25',
    completedDate: '2026-08-28',
    location: 'Sector 14, Pimpri-Chinchwad, Pune - 411033',
    geoCoordinates: '18.6279° N, 73.8009° E',
    priority: 'High',
    status: 'Completed',
    category: 'Education Infrastructure',
    description: 'Comprehensive evaluation of ICT lab setup, fire safety equipment, accessible washrooms, and solar rooftop installation under PM-SHRI scheme.',
    findingsCount: 3,
    openIssuesCount: 0,
    findings: [
      {
        id: 'FND-01',
        title: 'ICT Lab Computer System Power Backup Battery Failure',
        description: '3 out of 10 UPS battery units in the Atal Tinkering Lab are exhausted, causing abrupt shutdown during power fluctuation.',
        severity: 'Medium',
        status: 'Resolved',
        assignedPerson: 'Vinayak Patil',
        dueDate: '2026-09-05',
        resolvedDate: '2026-08-28',
        actionTaken: 'Replaced batteries with 12V 100Ah sealed units with 3-year warranty.'
      },
      {
        id: 'FND-02',
        title: 'Fire Extinguisher Pressure Gauge in Green Zone but Tag Outdated',
        description: '14 ABC Type 6kg extinguishers have active pressure but annual re-certification tag was pending since July 2026.',
        severity: 'Low',
        status: 'Resolved',
        assignedPerson: 'Vinayak Patil',
        dueDate: '2026-09-02',
        resolvedDate: '2026-08-27',
        actionTaken: 'Authorized agency inspected and renewed all inspection tags.'
      },
      {
        id: 'FND-03',
        title: 'Divyangjan Ramp Slope Conforms to CPWD Norms',
        description: 'Entrance ramp has 1:12 gradient with continuous double handrail. Compliant with Sugamya Bharat Abhiyan guidelines.',
        severity: 'Low',
        status: 'Resolved',
        assignedPerson: 'Dr. Sneha Jadhav',
        dueDate: '2026-08-28',
        resolvedDate: '2026-08-28',
        actionTaken: 'Documented with high-resolution photographic evidence.'
      }
    ],
    evidence: {
      photos: [
        { id: 'EV-P1', name: 'ICT_Lab_PowerBackup.jpg', size: '2.4 MB', date: '2026-08-25 11:32', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80' },
        { id: 'EV-P2', name: 'Ramp_Sugamya_Bharat.jpg', size: '1.8 MB', date: '2026-08-25 12:15', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80' },
        { id: 'EV-P3', name: 'FireSafety_InspectionTag.jpg', size: '3.1 MB', date: '2026-08-25 14:05', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80' }
      ],
      documents: [
        { id: 'EV-D1', name: 'Official_Site_Audit_Checklist_Signed.pdf', size: '1.2 MB', date: '2026-08-28' },
        { id: 'EV-D2', name: 'Fire_NOC_Verification_Certificate.pdf', size: '850 KB', date: '2026-08-27' },
        { id: 'EV-D3', name: 'Atal_Tinkering_Inventory_Report.pdf', size: '2.1 MB', date: '2026-08-26' }
      ],
      gpsData: {
        latitude: '18.627921 N',
        longitude: '73.800914 E',
        accuracy: '± 2.5 meters',
        timestamp: '2026-08-25T11:00:14 IST',
        device: 'NIC Geo-Tagging Rover G-44'
      },
      notes: 'Overall school environment meets central compliance mandates. School authorities were cooperative. Principal confirmed remedial actions were completed within 72 hours.'
    },
    timeline: [
      { step: 'Created', timestamp: '2026-08-20 10:00', by: 'DOJS Central Cell', note: 'Inspection order generated per Annual Quality Framework' },
      { step: 'Assigned', timestamp: '2026-08-21 14:30', by: 'State Education Directorate', note: 'Assigned to Central Compliance Team (TM-102)' },
      { step: 'Scheduled', timestamp: '2026-08-22 09:15', by: 'Prof. Ramesh K. Deshmukh', note: 'Field visit scheduled for 25 Aug 2026' },
      { step: 'Started', timestamp: '2026-08-25 10:45', by: 'Field Team TM-102', note: 'Geo-fencing check verified on-site' },
      { step: 'Findings Added', timestamp: '2026-08-25 16:30', by: 'Prof. Ramesh K. Deshmukh', note: '3 observations logged with photographic evidence' },
      { step: 'Completed', timestamp: '2026-08-28 17:00', by: 'Directorate Approval Board', note: 'Final inspection sign-off verified and archived' }
    ]
  },
  {
    id: 'INSP-2402',
    title: 'Community Health Centre Cold-Chain & Bio-Waste Audit',
    site: 'Mohanlalganj Community Health Centre (CHC)',
    organization: 'Public Health Division',
    orgId: 'ORG-004',
    team: 'Quality Assurance Team (TM-103)',
    teamId: 'TM-103',
    inspector: 'Dr. Vandana Shukla',
    date: '2026-08-30',
    scheduledDate: '2026-08-30',
    completedDate: null,
    location: 'CHC Complex, Mohanlalganj, Lucknow - 226301',
    geoCoordinates: '26.6834° N, 80.9922° E',
    priority: 'Critical',
    status: 'Requires Action',
    category: 'Healthcare & Public Safety',
    description: 'Urgent compliance inspection on vaccine deep freezer temperature telemetry logs and segregated color-coded biomedical waste disposal containers.',
    findingsCount: 4,
    openIssuesCount: 2,
    findings: [
      {
        id: 'FND-11',
        title: 'ILR (Ice Lined Refrigerator) Temperature Logger Drift (+8.4°C)',
        description: 'Continuous temperature sensor recorded above +8.0°C for 45 minutes between 03:00 AM and 03:45 AM due to secondary generator changeover delay.',
        severity: 'Critical',
        status: 'Open',
        assignedPerson: 'Dr. Tariq Ahmed',
        dueDate: '2026-09-03',
        actionTaken: 'Emergency thermal validation in progress; vaccine batch testing initiated.'
      },
      {
        id: 'FND-12',
        title: 'Yellow Bio-Waste Bin Liner Missing Barcode Tag',
        description: 'Central Pollution Control Board barcoded labels not pasted on yellow anatomical waste bags prior to dispatch.',
        severity: 'High',
        status: 'Open',
        assignedPerson: 'Pooja Singh',
        dueDate: '2026-09-02',
        actionTaken: 'Issued formal non-conformance notice to outsourced waste agency.'
      },
      {
        id: 'FND-13',
        title: 'Emergency Oxygen Manifold Cylinder Pressure Adequate',
        description: '24 manifold cylinders checked at 140 bar operating pressure with automated alarm functioning properly.',
        severity: 'Low',
        status: 'Resolved',
        assignedPerson: 'Harish Chandra',
        dueDate: '2026-08-30',
        resolvedDate: '2026-08-30',
        actionTaken: 'Logged in digital pressure registry.'
      },
      {
        id: 'FND-14',
        title: 'Staff Anti-Rabies Vaccine Stock Registry Reconciled',
        description: 'Physical inventory matches e-Aushadhi portal stock records exactly.',
        severity: 'Low',
        status: 'Resolved',
        assignedPerson: 'Harish Chandra',
        dueDate: '2026-08-30',
        resolvedDate: '2026-08-30',
        actionTaken: 'Digital counter-signature completed.'
      }
    ],
    evidence: {
      photos: [
        { id: 'EV-P11', name: 'ILR_ColdChain_TempLog.jpg', size: '2.9 MB', date: '2026-08-30 11:10', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
        { id: 'EV-P12', name: 'Biomedical_Waste_Bins.jpg', size: '3.4 MB', date: '2026-08-30 13:40', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80' }
      ],
      documents: [
        { id: 'EV-D11', name: 'CHC_Vaccine_Storage_Logsheet_Aug2026.pdf', size: '3.8 MB', date: '2026-08-30' },
        { id: 'EV-D12', name: 'CPCB_Waste_Transfer_Manifest.pdf', size: '1.4 MB', date: '2026-08-30' }
      ],
      gpsData: {
        latitude: '26.683419 N',
        longitude: '80.992251 E',
        accuracy: '± 1.8 meters',
        timestamp: '2026-08-30T10:48:32 IST',
        device: 'NIC Health Rover H-12'
      },
      notes: 'Priority action required on vaccine temperature backup system. Nodal officer summoned for emergency remediation within 48 hours.'
    },
    timeline: [
      { step: 'Created', timestamp: '2026-08-28 09:00', by: 'Health Dept Vigilance Wing', note: 'Initiated based on seasonal surveillance directive' },
      { step: 'Assigned', timestamp: '2026-08-28 11:30', by: 'Public Health Division HQ', note: 'Assigned to Quality Assurance Team (TM-103)' },
      { step: 'Scheduled', timestamp: '2026-08-29 10:00', by: 'Dr. Vandana Shukla', note: 'Site visit fixed for 30 Aug 2026' },
      { step: 'Started', timestamp: '2026-08-30 10:30', by: 'Field Team TM-103', note: 'On-site sensor inspection initiated' },
      { step: 'Findings Added', timestamp: '2026-08-30 15:45', by: 'Dr. Vandana Shukla', note: 'Critical cold-chain flag logged; rectification deadline set' }
    ]
  },
  {
    id: 'INSP-2403',
    title: 'Rural Road Project Quality & Bitumen Thickness Test',
    site: 'PMGSY Package RJ-04/12 (Jaipur to Dudu Bypass)',
    organization: 'National Infrastructure Authority',
    orgId: 'ORG-001',
    team: 'Northern Inspection Team (TM-101)',
    teamId: 'TM-101',
    inspector: 'Er. Sandeep Chauhan',
    date: '2026-09-01',
    scheduledDate: '2026-09-01',
    completedDate: null,
    location: 'Chainage 14+200 to 28+500, Dudu, Rajasthan',
    geoCoordinates: '26.6841° N, 75.2340° E',
    priority: 'High',
    status: 'In Progress',
    category: 'Road & Highway Infrastructure',
    description: 'Field core-cutter testing for dense bituminous macadam (DBM) compaction percentage, cross-slope camber measurements, and roadside drainage culverts.',
    findingsCount: 2,
    openIssuesCount: 1,
    findings: [
      {
        id: 'FND-21',
        title: 'Core Sample Compaction Ratio at 96.8% (Minimum 98% Required)',
        description: 'Bitumen core extracted at KM 18.4 showed 96.8% Marshall density against IRC:SP:20 specification.',
        severity: 'High',
        status: 'Open',
        assignedPerson: 'Kavita Das',
        dueDate: '2026-09-06',
        actionTaken: 'Additional 3 samples extracted for laboratory verification.'
      },
      {
        id: 'FND-22',
        title: 'Pre-cast Hume Pipe Culvert Alignment Satisfactory',
        description: '1000mm dia NP3 pipe culvert at chainage 16+800 installed with proper bedding and headwalls.',
        severity: 'Low',
        status: 'Resolved',
        assignedPerson: 'Amit Verma',
        dueDate: '2026-09-01',
        resolvedDate: '2026-09-01',
        actionTaken: 'Geotagged photographic records uploaded to portal.'
      }
    ],
    evidence: {
      photos: [
        { id: 'EV-P21', name: 'Core_Cutter_Extraction.jpg', size: '4.1 MB', date: '2026-09-01 10:15', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' },
        { id: 'EV-P22', name: 'Camber_CrossSlope_Measurement.jpg', size: '3.2 MB', date: '2026-09-01 11:30', url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80' }
      ],
      documents: [
        { id: 'EV-D21', name: 'PMGSY_Quality_Assurance_Sheet.pdf', size: '2.6 MB', date: '2026-09-01' }
      ],
      gpsData: {
        latitude: '26.684120 N',
        longitude: '75.234050 E',
        accuracy: '± 1.2 meters',
        timestamp: '2026-09-01T09:45:10 IST',
        device: 'Trimble GNSS RTK Rover'
      },
      notes: 'Live road audit under progress. Laboratory compression test results expected in 48 hours.'
    },
    timeline: [
      { step: 'Created', timestamp: '2026-08-26 14:00', by: 'DOJS National Cell', note: 'Sample road segment selected via algorithm' },
      { step: 'Assigned', timestamp: '2026-08-27 10:00', by: 'NIA HQ', note: 'Assigned to Northern Inspection Team (TM-101)' },
      { step: 'Scheduled', timestamp: '2026-08-28 16:00', by: 'Er. Sandeep Chauhan', note: 'Equipment mobilization scheduled for 01 Sept 2026' },
      { step: 'Started', timestamp: '2026-09-01 09:30', by: 'Field Team TM-101', note: 'Core extraction underway on-site' }
    ]
  },
  {
    id: 'INSP-2404',
    title: 'Government IT Centre Power & Fibre Redundancy Check',
    site: 'State Data Centre (SDC) Phase-II Facility',
    organization: 'Urban Development Authority',
    orgId: 'ORG-003',
    team: 'Field Verification Team (TM-104)',
    teamId: 'TM-104',
    inspector: 'Shri Gopinath Murthy',
    date: '2026-09-04',
    scheduledDate: '2026-09-04',
    completedDate: null,
    location: 'Electronic City Phase-1, Bengaluru - 560100',
    geoCoordinates: '12.8452° N, 77.6602° E',
    priority: 'Medium',
    status: 'Scheduled',
    category: 'Digital Infrastructure',
    description: 'Tier-III compliance verification for dual incoming grid transformers, automated diesel generator synchronizing panels, and diverse underground optical fiber ring paths.',
    findingsCount: 0,
    openIssuesCount: 0,
    findings: [],
    evidence: {
      photos: [],
      documents: [
        { id: 'EV-D31', name: 'Pre_Audit_SingleLineDiagram_Electrical.pdf', size: '5.2 MB', date: '2026-08-29' }
      ],
      gpsData: {
        latitude: '12.845210 N',
        longitude: '77.660240 E',
        accuracy: 'Coordinates pre-verified',
        timestamp: '2026-09-04 Scheduled',
        device: 'NIC Urban Mobile Geo-Kit'
      },
      notes: 'Scheduled for formal physical walk-through on 4th September 2026. Security passes pre-approved by SDC Chief Information Security Officer.'
    },
    timeline: [
      { step: 'Created', timestamp: '2026-08-28 15:30', by: 'UDA IT Infrastructure Wing', note: 'Annual uptime certification requirement' },
      { step: 'Assigned', timestamp: '2026-08-29 11:00', by: 'UDA Nodal Officer', note: 'Assigned to Field Verification Team (TM-104)' },
      { step: 'Scheduled', timestamp: '2026-08-30 14:00', by: 'Shri Gopinath Murthy', note: 'Scheduled for 04 Sept 2026 10:00 AM' }
    ]
  },
  {
    id: 'INSP-2405',
    title: 'Smart Water Pumping Station Sluice Valve Automation Audit',
    site: 'Chhattarpur High-Capacity Booster Pumping Station',
    organization: 'Central Water Commission',
    orgId: 'ORG-005',
    team: 'Hydraulic & Dam Safety Unit (TM-105)',
    teamId: 'TM-105',
    inspector: 'Er. Bharat Bhushan',
    date: '2026-09-06',
    scheduledDate: '2026-09-06',
    completedDate: null,
    location: 'Main Ring Road, Chhattarpur, New Delhi - 110074',
    geoCoordinates: '28.5021° N, 77.1812° E',
    priority: 'Medium',
    status: 'Pending',
    category: 'Water Distribution & Utilities',
    description: 'Review of SCADA telemetry latency, acoustic water leak sensors, and backup emergency diesel pumps for uninterrupted raw water transmission.',
    findingsCount: 0,
    openIssuesCount: 0,
    findings: [],
    evidence: {
      photos: [],
      documents: [],
      gpsData: {
        latitude: '28.502100 N',
        longitude: '77.181200 E',
        accuracy: 'GIS Registered',
        timestamp: 'Pending deployment',
        device: 'CWC Hydro Geo-Tracker'
      },
      notes: 'Work order approved by DOJS Technical Cell. Pending team confirmation for deployment date.'
    },
    timeline: [
      { step: 'Created', timestamp: '2026-08-31 16:20', by: 'DOJS Urban Water Oversight', note: 'Generated under National Water Mission Protocol' }
    ]
  }
];

export const initialReports = [
  {
    id: 'REP-2026-08',
    name: 'Monthly Inspection Performance & Quality Audit Report',
    period: 'August 2026',
    generatedDate: '2026-09-01',
    generatedBy: 'DOJS Central Analytical Engine',
    format: 'PDF / Excel',
    status: 'Verified & Published',
    fileSize: '4.8 MB',
    scope: 'All Registered Organizations & State Units',
    summary: '92% of scheduled inspections across 28 states completed within stipulated SLA. Critical findings resolved within 72 hours average turnaround.',
    category: 'Monthly Inspection Report',
    downloadUrl: '#'
  },
  {
    id: 'REP-CMP-Q2',
    name: 'Quarterly Organization Compliance & Governance Index',
    period: 'Q2 (April - June 2026)',
    generatedDate: '2026-07-15',
    generatedBy: 'Directorate of Official Oversight (DOJS)',
    format: 'PDF / Digital Gazette',
    status: 'Official Gazette Published',
    fileSize: '7.2 MB',
    scope: '6 Active Organizations & 31 Regional Teams',
    summary: 'Ranking and compliance scoring based on field evidence rigor, geo-tagging accuracy, and resolution speed of high-severity safety findings.',
    category: 'Organization Compliance Report',
    downloadUrl: '#'
  },
  {
    id: 'REP-TM-2401',
    name: 'Field Teams Operational Efficiency & Audit Rigor Report',
    period: 'July - August 2026',
    generatedDate: '2026-08-30',
    generatedBy: 'Field Operations Cell',
    format: 'PDF / CSV Data',
    status: 'Verified & Published',
    fileSize: '3.1 MB',
    scope: 'All Active Inspection Units (TM-101 to TM-105)',
    summary: 'Individual team metrics detailing average inspection duration, finding validation accuracy, drone footage attachments, and response times.',
    category: 'Team Performance Report',
    downloadUrl: '#'
  },
  {
    id: 'REP-ISS-2026',
    name: 'National Open Issues & Critical Remediation Register',
    period: 'Live Surveillance (As of Sept 2026)',
    generatedDate: '2026-09-01',
    generatedBy: 'Vigilance & Corrective Action Board',
    format: 'Interactive Data / PDF',
    status: 'Action In-Progress',
    fileSize: '2.5 MB',
    scope: 'Critical & High Priority Non-Conformances',
    summary: 'Comprehensive list of open structural, healthcare, and water utility remediation notices with assigned nodal officers and strict countdown timers.',
    category: 'Open Issues Report',
    downloadUrl: '#'
  },
  {
    id: 'REP-SUM-AUG',
    name: 'Executive Inspection Summary & Governance Digest',
    period: 'August 2026',
    generatedDate: '2026-08-31',
    generatedBy: 'Joint Secretary (DOJS)',
    format: 'Executive Summary PDF',
    status: 'Verified & Published',
    fileSize: '1.9 MB',
    scope: 'Ministry Level Briefing',
    summary: 'Condensed high-level executive dashboard summary prepared for departmental parliamentary review and state review meetings.',
    category: 'Inspection Summary',
    downloadUrl: '#'
  },
  {
    id: 'REP-REG-WEST',
    name: 'Western & Central Region Infrastructure Assessment',
    period: 'Bi-Annual 2026',
    generatedDate: '2026-08-20',
    generatedBy: 'Regional Directorates (MH, MP, RJ, GJ)',
    format: 'PDF / Geospatial Map Pack',
    status: 'Verified & Published',
    fileSize: '12.4 MB',
    scope: 'Western Zone Infrastructure Sites',
    summary: 'Cross-comparison of rural roads, public schools, and community health centres across western state clusters with GIS heatmap overlays.',
    category: 'Regional Performance Report',
    downloadUrl: '#'
  }
];

export const systemAlerts = [
  {
    id: 'ALT-01',
    type: 'warning',
    title: 'Vaccine Cold-Chain Temperature Variance Notice',
    organization: 'Public Health Division',
    timestamp: '2026-08-30 16:00',
    message: 'Inspection INSP-2402 logged a critical temperature drift finding at Mohanlalganj CHC. Immediate DOJS technical review required.',
    isRead: false
  },
  {
    id: 'ALT-02',
    type: 'info',
    title: 'New Nodal Organization Verification Pending',
    organization: 'Rural Development Mission (RDM-RJ)',
    timestamp: '2026-08-31 09:30',
    message: 'Credential issuance review requested for state nodal supervisor.',
    isRead: false
  },
  {
    id: 'ALT-03',
    type: 'success',
    title: 'PM-SHRI Model School Audit Completed with Full Compliance',
    organization: 'State Education Directorate',
    timestamp: '2026-08-28 17:15',
    message: 'Inspection INSP-2401 successfully closed with 100% resolution of noted items.',
    isRead: true
  }
];
