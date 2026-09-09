// Mock Land Governance API Service for BHOOMIVISION Land Governance Module

export const GOVERNANCE_STATS = {
  totalLandArea: '328.7 million ha',
  totalLandAreaSub: '100% of geographical area',
  digitizedRecords: '86.4%',
  digitizedRecordsSub: 'of total records digitized',
  landDisputes: '12,428',
  landDisputesSub: 'reported active cases (2019-2024)',
  acquisitionProjects: '1,203',
  acquisitionProjectsSub: 'ongoing infrastructure projects',
};

export const MOCK_GOVERNANCE_FEATURES = [
  {
    id: 'feat_01',
    title: 'Land Records',
    description: 'Access digitized land records, mutation logs and ownership details.',
    icon: 'FileText',
    bgColor: 'bg-emerald-100/80',
    iconColor: 'text-emerald-800',
    link: '/land-governance/records',
  },
  {
    id: 'feat_02',
    title: 'Dispute Tracking',
    description: 'Monitor land dispute cases, judicial status and dispute hotspots.',
    icon: 'AlertTriangle',
    bgColor: 'bg-sky-100/80',
    iconColor: 'text-sky-800',
    link: '/land-governance/disputes',
  },
  {
    id: 'feat_03',
    title: 'Acquisition Monitoring',
    description: 'Track ongoing and completed infrastructure land acquisition projects.',
    icon: 'Building2',
    bgColor: 'bg-purple-100/80',
    iconColor: 'text-purple-800',
    link: '/land-governance/acquisition',
  },
  {
    id: 'feat_04',
    title: 'Policy & Legal Framework',
    description: 'Explore state and central land laws, statutory acts and policies.',
    icon: 'Scale',
    bgColor: 'bg-amber-100/80',
    iconColor: 'text-amber-800',
    link: '/policy-innovation',
  },
  {
    id: 'feat_05',
    title: 'Governance Dashboard',
    description: 'View state-wise and district-wise land governance performance.',
    icon: 'BarChart3',
    bgColor: 'bg-teal-100/80',
    iconColor: 'text-teal-800',
    link: '/land-governance/dashboard',
  },
  {
    id: 'feat_06',
    title: 'Grievance Redressal',
    description: 'Submit and track grievances related to land records and disputes.',
    icon: 'HelpCircle',
    bgColor: 'bg-red-100/80',
    iconColor: 'text-red-800',
    link: '/grievance',
  },
];

export const MOCK_RECENT_UPDATES = [
  {
    id: 'upd_01',
    type: 'Policy',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    title: 'New Land Acquisition Policy 2025 Released',
    department: 'Ministry of Rural Development, GoI',
    date: '12 Mar 2025',
  },
  {
    id: 'upd_02',
    type: 'Update',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-200',
    title: 'West Bengal Land Records Digitization Complete',
    department: 'Department of Land & Land Reforms, WB',
    date: '10 Mar 2025',
  },
  {
    id: 'upd_03',
    type: 'Notice',
    badgeColor: 'bg-red-100 text-red-900 border-red-200',
    title: 'Nadia District – Land Dispute Resolution Camp Scheduled',
    department: 'District Administration, Nadia',
    date: '08 Mar 2025',
  },
  {
    id: 'upd_04',
    type: 'Scheme',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    title: 'Pradhan Mantri Awas Yojana (PMAY) – Land Guidelines Updated',
    department: 'Ministry of Housing and Urban Affairs',
    date: '05 Mar 2025',
  },
];

export const MOCK_GOVERNANCE_RISKS = [
  {
    id: 'risk_01',
    title: 'Rapid Agricultural Land Conversion',
    riskLevel: 'Medium Risk',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    location: 'Nadia District (West Bengal)',
    reason: 'Multi-temporal satellite imagery indicates a 12.4% reduction in prime paddy cropland due to peri-urban development and brickfield expansion.',
    evidence: 'ISRO Bhuvan LULC Satellite Audit & District Crop Census',
    relatedPolicy: 'West Bengal Land Reforms Act 1955 (Section 4C)',
    relatedResearch: 'Land Use Transformation in Nadia District (2024)',
  },
  {
    id: 'risk_02',
    title: 'High Development Pressure along NH-34 Corridor',
    riskLevel: 'High Risk',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    location: 'Krishnanagar & Ranaghat Blocks',
    reason: 'Highway widening coupled with industrial warehousing has increased land speculative transactions by 45% over 3 years.',
    evidence: 'District Registration Office Deed Volume & Cadastral Overlay',
    relatedPolicy: 'National Highway Land Acquisition Framework',
    relatedResearch: 'Impact Assessment of Land Acquisition Rights (2024)',
  },
  {
    id: 'risk_03',
    title: 'Potential Boundary & Inheritance Mutation Friction',
    riskLevel: 'Moderate Risk',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    location: 'Santipur & Chapra Panchayats',
    reason: 'Non-mutated ancestral land titles account for 64% of active civil land litigation cases in local tribunals.',
    evidence: 'Nadia District Tribunal Registry Case Audit',
    relatedPolicy: 'DILRMP Conclusive Titling Guidelines',
    relatedResearch: 'Socioeconomic Causes of Rural Land Disputes (2023)',
  },
];

export const MOCK_GOVERNANCE_EVIDENCE = [
  {
    id: 'gev_01',
    sourceType: 'Government Data',
    sourceName: 'West Bengal Banglarbhumi Land Record Portal (2025)',
    year: '2025',
    finding: '86.4% of land plot records in Nadia have been digitized and geo-referenced with Bhuvan spatial overlays.',
    location: 'Nadia, West Bengal',
    evidenceStrength: 'High Confidence (95%)',
  },
  {
    id: 'gev_02',
    sourceType: 'GIS/Satellite Data',
    sourceName: 'Sentinel-2 LULC Time-Series Audit (2015-2025)',
    year: '2024',
    finding: 'Built-up area expanded by 18.2% along Krishnanagar urban margins over the last decade.',
    location: 'Krishnanagar, Nadia',
    evidenceStrength: 'High Confidence (96%)',
  },
  {
    id: 'gev_03',
    sourceType: 'Statistical Report',
    sourceName: 'National Judicial Data Grid (NJDG) Land Litigation Index',
    year: '2024',
    finding: 'Digital mutation verification reduced average dispute court pendency from 4.8 years to 2.1 years.',
    location: 'State-wide / Nadia',
    evidenceStrength: 'High Confidence (91%)',
  },
];

export const getAIGovernanceResponse = (query, location = 'Nadia, West Bengal') => {
  return {
    query: query,
    insight: `In ${location}, governance intelligence shows high digital record completion (86.4%), but emerging land-use stress along industrial transit corridors. Combining geo-tagged cadastral maps with real-time drone verification has proven most effective at mitigating boundary dispute escalation.`,
    confidence: '95% (High Confidence)',
    evidenceSources: MOCK_GOVERNANCE_EVIDENCE,
    riskFactors: MOCK_GOVERNANCE_RISKS,
  };
};
