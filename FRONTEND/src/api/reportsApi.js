// Mock Reports API Service for BHOOMIVISION Reports Module

export const REPORT_CATEGORIES = [
  { id: 'lulc_report', name: 'Land Use & Land Cover Report', icon: 'Layers' },
  { id: 'change_report', name: 'Land Change Report', icon: 'TrendingUp' },
  { id: 'gov_report', name: 'Land Governance Report', icon: 'ShieldCheck' },
  { id: 'dispute_report', name: 'Land Dispute Insight Report', icon: 'AlertTriangle' },
  { id: 'agri_report', name: 'Agricultural Land Report', icon: 'Sprout' },
  { id: 'dev_report', name: 'Development Pressure Report', icon: 'Building2' },
  { id: 'policy_report', name: 'Policy Impact Report', icon: 'Scale' },
  { id: 'env_report', name: 'Environmental Land Report', icon: 'TreePine' },
  { id: 'gis_report', name: 'GIS Area Intelligence Report', icon: 'Map' },
  { id: 'evidence_report', name: 'Research & Evidence Report', icon: 'BookOpen' },
];

export const MOCK_REPORTS = [
  {
    id: 'rep_01',
    title: 'Nadia District Land Use Change Intelligence Report (2015-2025)',
    category: 'change_report',
    categoryName: 'Land Change Report',
    location: 'Nadia, West Bengal',
    period: '2015–2025',
    dataCoverage: 'GIS + Land Records + Research + Governance',
    updatedDate: '12 Mar 2025',
    evidenceLevel: 'High Confidence (96%)',
    status: 'Available',
    summary: 'Decadal spatial audit analyzing agricultural cropland reduction, built-up infrastructure expansion, and boundary litigation risk in Nadia district.',
    executiveSummary: 'Illustrative AI Summary: High built-up expansion (+18.2%) observed along NH-[#34] corridor with a corresponding 12.4% reduction in prime paddy cultivations.',
    keyInsights: [
      '12.4% reduction in arable agricultural land across 10 years.',
      '64% of boundary litigation correlates with un-mutated family land titles.',
      'DILRMP digitization reached 86.4% completion across local panchayats.'
    ],
    gisLayers: ['Sentinel-2 LULC Vector', 'Cadastral RoR Plot Mask'],
    evidenceList: ['ISRO Bhuvan Satellite LULC Audit', 'West Bengal Land Reforms Survey', 'National Judicial Data Grid'],
  },
  {
    id: 'rep_02',
    title: 'West Bengal Land Acquisition & Resettlement Impact Report',
    category: 'policy_report',
    categoryName: 'Policy Impact Report',
    location: 'State-wide (West Bengal)',
    period: '2020–2025',
    dataCoverage: 'Policy + Research + Socioeconomic Data',
    updatedDate: '10 Mar 2025',
    evidenceLevel: 'High Confidence (92%)',
    status: 'Available',
    summary: 'Evaluating economic resettlement outcomes and compensation fairness under RFCTLARR Act 2013 across major highway corridor projects.',
    executiveSummary: 'Illustrative AI Summary: Direct land-for-land replacement and skill training yielded 40% higher long-term income retention than lump-sum cash compensation.',
    keyInsights: [
      'Digital land records reduced compensation disbursement turnaround to 45 days.',
      'Social Impact Assessments (SIA) mandatory across 100% of projects.'
    ],
    gisLayers: ['Acquisition SIA Boundary Buffer', 'Compensation Index Overlay'],
    evidenceList: ['Centre for Policy Research (CPR India)', 'State Revenue Dept Annual Audit'],
  },
  {
    id: 'rep_03',
    title: 'Krishnanagar Urban Sprawl & Wetland Buffer Report',
    category: 'dev_report',
    categoryName: 'Development Pressure Report',
    location: 'Krishnanagar Block, Nadia',
    period: '2022–2025',
    dataCoverage: 'GIS Satellite + Urban Planning Data',
    updatedDate: '05 Mar 2025',
    evidenceLevel: 'Medium Confidence (88%)',
    status: 'Demo Report',
    summary: 'Spatial investigation tracking urban encroachment along Jalangi river wetlands and municipal boundary expansion.',
    executiveSummary: 'Illustrative AI Summary: Rapid peri-urban building growth threatens seasonal floodplain recharge zones near Krishnanagar municipality.',
    keyInsights: [
      'Urban built-up area increased by 8.4 km² over 3 years.',
      'Floodplain buffer encroachment index reached High Vulnerability mark.'
    ],
    gisLayers: ['Jalangi River Floodplain Buffer', 'Municipal Boundary Map'],
    evidenceList: ['Nadia Town & Country Planning Audit', 'ISRO Remote Sensing Sheet'],
  },
];

export const MOCK_REPORT_EVIDENCE = [
  {
    id: 'rev_01',
    sourceName: 'ISRO Bhuvan 10m LULC Satellite Audit',
    sourceType: 'GIS/Satellite Dataset',
    year: '2024',
    locationCoverage: 'Nadia District, West Bengal',
    keyFinding: 'Satellite imagery verifies a 12.4% shift from agricultural cropland to built-up infrastructure in Nadia district.',
    evidenceStrength: 'High Confidence (96%)',
  },
  {
    id: 'rev_02',
    sourceName: 'West Bengal Land & Land Reforms Department Annual Audit',
    sourceType: 'Government Dataset',
    year: '2025',
    locationCoverage: 'State-wide / Nadia',
    keyFinding: '86.4% of land records in Nadia have been digitized and linked with DGPS cadastral boundaries.',
    evidenceStrength: 'High Confidence (94%)',
  },
  {
    id: 'rev_03',
    sourceName: 'National Judicial Data Grid (NJDG) Dispute Census',
    sourceType: 'Statistical Dataset',
    year: '2024',
    locationCoverage: 'State-wide',
    keyFinding: 'Digital mutation verification reduced average dispute court pendency from 4.8 years to 2.1 years.',
    evidenceStrength: 'High Confidence (91%)',
  },
];

export const getAIReportResponse = (query, location = 'Nadia, West Bengal') => {
  return {
    query: query,
    insight: `Intelligence synthesis for ${location} indicates high land record digitization (86.4%), coupled with multi-temporal satellite evidence proving agricultural shrinkage along industrial corridors.`,
    confidence: '95% (High Confidence)',
    evidenceSources: MOCK_REPORT_EVIDENCE,
    suggestedReport: MOCK_REPORTS[0],
  };
};
