// Mock Policy API Service for BHOOMIVISION Policy Innovation Module

export const POLICY_CATEGORIES = [
  { id: 'laws_acts', name: 'Land Laws & Acts', icon: 'Scale' },
  { id: 'schemes', name: 'Government Schemes', icon: 'Building2' },
  { id: 'documents', name: 'Policy Documents', icon: 'FileText' },
  { id: 'best_practices', name: 'Innovation & Best Practices', icon: 'Lightbulb' },
  { id: 'governance', name: 'Stakeholders & Governance', icon: 'Users' },
  { id: 'reforms', name: 'Land Reforms', icon: 'RefreshCw' },
  { id: 'analysis', name: 'Policy Analysis', icon: 'BarChart3' },
  { id: 'recommendations', name: 'Future Recommendations', icon: 'Sparkles' },
];

export const MOCK_POLICIES = [
  {
    id: 'pol_01',
    title: 'National Land Use Policy 2019 Framework',
    category: 'documents',
    categoryName: 'Policy Documents',
    tagType: 'Central Policy',
    tagColor: 'bg-emerald-100 text-emerald-900',
    authority: 'Ministry of Rural Development, Government of India',
    date: '12 Mar 2019',
    coverage: 'National',
    evidenceLevel: 'High (Research + Govt Data)',
    status: 'Active',
    summary: 'A comprehensive national framework ensuring optimal land utilization, preservation of prime agricultural zones, and climate-resilient regional spatial planning.',
    objective: 'Protect arable agricultural land while facilitating sustainable industrial and urban expansion.',
    problemAddressed: 'Unplanned conversion of agricultural land into non-farm usage causing food security threats and land-use conflicts.',
    targetBeneficiaries: 'Farmers, Agrarian Communities, Urban Planners',
    keyProvisions: fontProvisions(['Zoning mandates for prime agricultural land', 'Compensatory land restoration fund', 'District-level land use boards']),
    impactMetrics: {
      agriProtection: 88,
      disputeReduction: 74,
      ecoSustainability: 82,
      infrastructureSupport: 79,
    },
    relatedResearch: 'Land Use Transformation in Eastern India (2024)',
    gisLayers: ['National Land Use Mask', 'Agricultural Protection Zone'],
  },
  {
    id: 'pol_02',
    title: 'Digital India Land Records Modernization Programme (DILRMP)',
    category: 'schemes',
    categoryName: 'Government Schemes',
    tagType: 'Scheme',
    tagColor: 'bg-sky-100 text-sky-900',
    authority: 'Department of Land Resources, GoI',
    date: '15 Aug 2020',
    coverage: 'National',
    evidenceLevel: 'High (Govt Data + Field Audit)',
    status: 'Active',
    summary: 'Central sector scheme digitizing text Record of Rights (RoR), vectorizing cadastral maps, and integrating registration with land records.',
    objective: 'Achieve conclusive land titling through real-time mutation updates and geo-referenced boundary verification.',
    problemAddressed: 'Fraudulent double-titling, opaque manual land records, and decade-long civil land litigation.',
    targetBeneficiaries: 'All Landowners, Financial Institutions, Judicial System',
    keyProvisions: fontProvisions(['Computerization of RoR registers', 'High-res drone cadastral surveys', 'Integration of land registration & tax records']),
    impactMetrics: {
      agriProtection: 65,
      disputeReduction: 92,
      ecoSustainability: 60,
      infrastructureSupport: 85,
    },
    relatedResearch: 'Blockchain and Geo-referenced Cadastral Mapping (2025)',
    gisLayers: ['Cadastral Parcel Map', 'RoR Mutation Layer'],
  },
  {
    id: 'pol_03',
    title: 'West Bengal Land Reforms Act (1955 & Amendments)',
    category: 'laws_acts',
    categoryName: 'Land Laws & Acts',
    tagType: 'State Act',
    tagColor: 'bg-purple-100 text-purple-900',
    authority: 'Government of West Bengal',
    date: '20 Jun 1955',
    coverage: 'State (West Bengal)',
    evidenceLevel: 'High Confidence',
    status: 'Active',
    summary: 'Legislative act regulating ceiling on land holdings, protection of sharecroppers (Bargadars), and non-agricultural land conversions.',
    objective: 'Ensure equitable redistribution of ceiling-surplus land and protect tenant farmer cultivation rights.',
    problemAddressed: 'Feudal land concentration and eviction of small landless tenant farmers.',
    targetBeneficiaries: 'Bargadars, Small & Marginal Farmers',
    keyProvisions: fontProvisions(['Legal registration of Bargadars (Operation Barga)', 'Ceiling cap on agricultural holdings', 'Mandatory conversion permission for land usage change']),
    impactMetrics: {
      agriProtection: 91,
      disputeReduction: 78,
      ecoSustainability: 75,
      infrastructureSupport: 68,
    },
    relatedResearch: 'Socioeconomic Causes of Rural Land Disputes (2023)',
    gisLayers: ['Ceiling Surplus Land Map', 'Panchayat Tenant Boundary'],
  },
  {
    id: 'pol_04',
    title: 'Nadia District Land Use Plan (2021-2031)',
    category: 'analysis',
    categoryName: 'Policy Analysis',
    tagType: 'State Plan',
    tagColor: 'bg-teal-100 text-teal-900',
    authority: 'Nadia District Administration & Town Planning Dept',
    date: '14 Jan 2021',
    coverage: 'District (Nadia)',
    evidenceLevel: 'Medium Confidence',
    status: 'Active',
    summary: 'District-specific spatial policy managing peri-urban expansion along Krishnanagar-Ranaghat industrial corridors.',
    objective: 'Prevent uncontrolled encroachment of flood-plain croplands while fostering logistics and agro-processing hubs.',
    problemAddressed: 'Encroachment of Bhagirathi-Hooghly river floodplains and rapid brickfield growth.',
    targetBeneficiaries: 'Local Panchayats, Commercial Developers, Farmers',
    keyProvisions: fontProvisions(['Buffer zones along Bhagirathi river basin', 'Industrial zoning along NH-34', 'Compensatory wetland reservation']),
    impactMetrics: {
      agriProtection: 80,
      disputeReduction: 70,
      ecoSustainability: 88,
      infrastructureSupport: 84,
    },
    relatedResearch: 'Land Use Transformation in Nadia District (2024)',
    gisLayers: ['River Basin Buffer Overlay', 'NH-34 Corridor Plan'],
  },
  {
    id: 'pol_05',
    title: 'RFCTLARR Act 2013 (Land Acquisition & Rehabilitation)',
    category: 'laws_acts',
    categoryName: 'Land Laws & Acts',
    tagType: 'Central Policy',
    tagColor: 'bg-emerald-100 text-emerald-900',
    authority: 'Parliament of India',
    date: '01 Jan 2014',
    coverage: 'National',
    evidenceLevel: 'High Confidence',
    status: 'Active',
    summary: 'Land acquisition law establishing fair compensation (4x market value in rural areas), mandatory Social Impact Assessment (SIA), and consent requirements.',
    objective: 'Ensure transparent acquisition process with comprehensive rehabilitation and resettlement (R&R).',
    problemAddressed: 'Forced land dispossession, inadequate compensation, and social unrest in industrial projects.',
    targetBeneficiaries: 'Project-Affected Families, Rural Landowners, Indigenous Groups',
    keyProvisions: fontProvisions(['Mandatory 70-80% consent for private/PPP projects', 'Social Impact Assessment (SIA) mandatory', '4x rural / 2x urban market compensation']),
    impactMetrics: {
      agriProtection: 85,
      disputeReduction: 81,
      ecoSustainability: 72,
      infrastructureSupport: 76,
    },
    relatedResearch: 'Impact Assessment of Land Acquisition Rights (2024)',
    gisLayers: ['SIA Corridor Buffer Map', 'Compensation Index Overlay'],
  },
];

export const MOCK_INNOVATIONS = [
  {
    id: 'inn_01',
    title: 'Drone-based Land Monitoring in Maharashtra',
    category: 'Technology',
    badgeColor: 'bg-sky-100 text-sky-900',
    description: 'High-resolution drone mapping of village abadi (habitation) areas under SVAMITVA scheme, issuing clear ownership property cards.',
    impact: 'Reduced village boundary litigation by 42% across 8,000 villages.',
    image: 'drone_monitoring',
  },
  {
    id: 'inn_02',
    title: 'Digital Land Records & AnyRoR in Gujarat',
    category: 'Case Study',
    badgeColor: 'bg-amber-100 text-amber-900',
    description: 'Unified online portal enabling 24/7 access to digital land records, certified 7/12 extracts, and instant online mutation applications.',
    impact: 'Cut mutation turnaround time from 90 days to under 72 hours.',
    image: 'digital_gujarat',
  },
  {
    id: 'inn_03',
    title: 'Community-led Land Governance & Gram Sabha Rights',
    category: 'Innovation',
    badgeColor: 'bg-purple-100 text-purple-900',
    description: 'Empowering local Gram Sabhas to map community forest resource (CFR) rights using handheld GPS devices under Forest Rights Act.',
    impact: 'Secured land tenure rights for 1.2 million tribal households.',
    image: 'community_governance',
  },
  {
    id: 'inn_04',
    title: 'Agroforestry for Land Restoration in Saline Zones',
    category: 'Sustainable Practice',
    badgeColor: 'bg-emerald-100 text-emerald-900',
    description: 'Green policy incentives for farmers planting halophyte trees on saline, degraded agricultural lands.',
    impact: 'Restored 45,000 hectares of barren coastal soil into productive agro-zones.',
    image: 'agroforestry',
  },
];

export const MOCK_POLICY_EVIDENCE = [
  {
    id: 'pev_01',
    sourceType: 'Government Report',
    sourceName: 'NITI Aayog Land Titling Working Group (2023)',
    year: '2023',
    keyFinding: 'Conclusive land titling legislation can boost national GDP growth by 1.3% by unlocking land collateral for institutional agricultural credit.',
    relatedPolicy: 'DILRMP & Conclusive Titling Bill',
    evidenceStrength: 'High Confidence (94%)',
  },
  {
    id: 'pev_02',
    sourceType: 'Research Paper',
    sourceName: 'Journal of Land Use & Urban Policy (2024)',
    year: '2024',
    keyFinding: 'Enforcing strict agricultural zoning reduced speculative peri-urban land hoarding by 31% in Gangetic delta districts.',
    relatedPolicy: 'National Land Use Policy 2019',
    evidenceStrength: 'High Confidence (91%)',
  },
  {
    id: 'pev_03',
    sourceType: 'GIS Satellite Dataset',
    sourceName: 'ISRO Bhuvan LULC Decadal Audit',
    year: '2024',
    keyFinding: 'Satellite monitoring confirms a 15.2% expansion in green tree cover across districts adopting agroforestry land incentives.',
    relatedPolicy: 'National Agroforestry Policy & State Land Schemes',
    evidenceStrength: 'High Confidence (96%)',
  },
];

function fontProvisions(arr) {
  return arr;
}

export const getFilteredPolicies = ({ category, state, searchKeyword }) => {
  return MOCK_POLICIES.filter((pol) => {
    if (category && category !== 'all' && pol.category !== category) return false;
    if (state && state !== 'All States' && pol.coverage !== 'National' && !pol.coverage.includes(state)) return false;
    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      const matchTitle = pol.title.toLowerCase().includes(q);
      const matchSummary = pol.summary.toLowerCase().includes(q);
      const matchAuth = pol.authority.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchAuth) return false;
    }
    return true;
  });
};

export const getAIPolicyResponse = (query) => {
  return {
    query: query,
    insight: `Land acquisition and land-use policies significantly impact agricultural sustainability, displacement compensation fairness, and local dispute litigation. Evidence proves that combining transparent digital RoR records with mandatory Social Impact Assessments reduces dispute rates by over 74%.`,
    confidence: '94% (High Confidence)',
    evidenceSources: MOCK_POLICY_EVIDENCE,
    suggestedPolicies: [MOCK_POLICIES[0], MOCK_POLICIES[1]],
  };
};
