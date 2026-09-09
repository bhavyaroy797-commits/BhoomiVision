// Mock Research API service for BHOOMIVISION Public Research Module

export const RESEARCH_CATEGORIES = [
  { id: 'lulc', name: 'Land Use & Land Cover', icon: 'Map' },
  { id: 'disputes', name: 'Land Disputes & Conflicts', icon: 'AlertTriangle' },
  { id: 'acquisition', name: 'Land Acquisition', icon: 'Building' },
  { id: 'records', name: 'Land Records & Ownership', icon: 'FileCheck' },
  { id: 'agriculture', name: 'Agricultural Land', icon: 'Sprout' },
  { id: 'urban_rural', name: 'Urban & Rural Development', icon: 'Home' },
  { id: 'policy_gov', name: 'Land Policy & Governance', icon: 'Scale' },
  { id: 'environment', name: 'Environmental & Natural Resources', icon: 'TreePine' },
  { id: 'market', name: 'Land Market & Property', icon: 'TrendingUp' },
  { id: 'climate', name: 'Climate & Disaster Impact', icon: 'CloudRain' },
];

export const MOCK_RESEARCH_PAPERS = [
  {
    id: 'res_01',
    title: 'Land Use Transformation and Agricultural Shrinkage in Nadia District (2015–2025)',
    summary: 'A decade-long multi-temporal satellite analysis evaluating the conversion of fertile agricultural land into peri-urban settlements in Nadia, West Bengal.',
    category: 'lulc',
    categoryName: 'Land Use & Land Cover',
    state: 'West Bengal',
    district: 'Nadia',
    year: 2024,
    researchType: 'GIS Study',
    dataType: 'Satellite Data',
    source: 'National Remote Sensing Centre (NRSC) & ISRO Journal',
    tags: ['LULC', 'Nadia', 'Agricultural Change', 'Sentinel-2'],
    evidenceStrength: 'High Confidence',
    confidenceScore: 94,
    authors: 'Dr. A. K. Banerjee, S. Roy (ISRO-NRSC)',
    abstract: 'This study utilizes Sentinel-2 and Landsat multi-spectral imagery to map land cover transformations across Nadia district from 2015 to 2025. Results reveal a 12.4% reduction in prime paddy cultivations due to rapid brickfield growth and suburban expansion near Krishnanagar.',
    keyFindings: [
      '12.4% reduction in arable agricultural land over 10 years.',
      '18.2% increase in built-up area along NH-34 corridor.',
      'Brickfield expansion accounts for 3.1% of topsoil degradation in Ranaghat block.'
    ],
    gisLayersAvailable: ['LULC 2015-2025', 'Built-up Expansion Vector', 'Soil Fertility Mask'],
  },
  {
    id: 'res_02',
    title: 'Socioeconomic Causes and Judicial Latency of Rural Land Disputes in Eastern India',
    summary: 'Empirical analysis of 12,400+ land dispute cases examining boundary mismatches, inheritance fragmentation, and digitised Record of Rights (RoR) accuracy.',
    category: 'disputes',
    categoryName: 'Land Disputes & Conflicts',
    state: 'West Bengal',
    district: 'All Districts',
    year: 2023,
    researchType: 'Academic Research',
    dataType: 'Land Records',
    source: 'National Institute of Rural Development & Panchayati Raj',
    tags: ['Land Disputes', 'RoR Digitization', 'Mutations', 'Judicial Backlog'],
    evidenceStrength: 'High Confidence',
    confidenceScore: 91,
    authors: 'Prof. R. Chattopadhyay, N. Sengupta',
    abstract: 'Investigating rural litigation patterns across 18 West Bengal districts. Findings indicate that un-updated ancestral records and delayed mutation processes trigger 64% of boundary litigation.',
    keyFindings: [
      '64% of rural disputes stem from non-mutated inheritance titles.',
      'Digitized RoR with geo-tagged plot boundaries reduced fresh disputes by 34%.',
      'Average court dispute duration is 4.8 years without mediation.'
    ],
    gisLayersAvailable: ['Dispute Hotspot Map', 'Cadastral Boundary Overlay'],
  },
  {
    id: 'res_03',
    title: 'Impact Assessment of Land Acquisition Rights & Compensation Fairness under RFCTLARR Act',
    summary: 'Evaluating economic resettlement outcomes and livelihood restoration among farmers affected by industrial corridor land acquisition.',
    category: 'acquisition',
    categoryName: 'Land Acquisition',
    state: 'Gujarat',
    district: 'Ahmedabad',
    year: 2024,
    researchType: 'Policy Study',
    dataType: 'Socioeconomic Data',
    source: 'Centre for Policy Research (CPR India)',
    tags: ['Land Acquisition', 'Compensation', 'RFCTLARR', 'Farmer Resettlement'],
    evidenceStrength: 'High Confidence',
    confidenceScore: 89,
    authors: 'M. Mehta, V. Sharma (CPR India)',
    abstract: 'Assessing 450 farmer households across 12 infrastructure acquisition sites. Demonstrates that direct equity sharing and skill training yields 40% higher long-term income retention than lump-sum cash compensation.',
    keyFindings: [
      'Direct land-for-land replacement preferred by 78% of smallholders.',
      'Digital land records reduced compensation disbursement delays from 14 months to 45 days.'
    ],
    gisLayersAvailable: ['Acquisition Boundary Overlay', 'Compensation Index Map'],
  },
  {
    id: 'res_04',
    title: 'Blockchain and Geo-referenced Cadastral Mapping for Fraud Prevention in Land Ownership',
    summary: 'Field trial of immutable ledger technology coupled with drone-assisted spatial surveys to eliminate double-titling and boundary tampering.',
    category: 'records',
    categoryName: 'Land Records & Ownership',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    year: 2025,
    researchType: 'Government Report',
    dataType: 'GIS Data',
    source: 'Digital India Land Records Modernization Programme (DILRMP)',
    tags: ['Blockchain', 'DILRMP', 'Cadastral Drone Mapping', 'Property Cards'],
    evidenceStrength: 'High Confidence',
    confidenceScore: 96,
    authors: 'Ministry of Rural Development & Survey of India',
    abstract: 'Pilot evaluation across 120 villages implementing high-resolution drone mapping (5cm GSD) and smart contracts for property ownership transfers.',
    keyFindings: [
      'Zero double-mortgage fraud cases recorded post-blockchain registration.',
      'Survey time reduced by 82% compared to traditional ETS chain survey.'
    ],
    gisLayersAvailable: ['Drone Cadastral Map', 'High-Res Orthomosaic'],
  },
  {
    id: 'res_05',
    title: 'Climate Resilience & Soil Carbon Sequestration in Degraded Agricultural Landscapes',
    summary: 'Multi-year environmental monitoring of agroforestry adoption and soil health recovery in drought-prone agricultural zones.',
    category: 'environment',
    categoryName: 'Environmental & Natural Resources',
    state: 'Maharashtra',
    district: 'Ahmednagar',
    year: 2024,
    researchType: 'Field Study',
    dataType: 'Agricultural Data',
    source: 'Indian Council of Agricultural Research (ICAR)',
    tags: ['Agroforestry', 'Soil Carbon', 'Climate Resilience', 'ICAR'],
    evidenceStrength: 'Medium Confidence',
    confidenceScore: 85,
    authors: 'Dr. P. Deshmukh, K. Kulkarni',
    abstract: 'Evaluating soil organic carbon accumulation across 2,400 hectares of restored wasteland using satellite NDVI time-series.',
    keyFindings: [
      'Soil organic carbon increased by 0.42% over 4 years under tree-crop intercropping.',
      'Groundwater recharge rates improved by 22% in watershed intervention blocks.'
    ],
    gisLayersAvailable: ['NDVI Change Index', 'Groundwater Recharge Map'],
  },
];

export const MOCK_EVIDENCE_ITEMS = [
  {
    id: 'ev_01',
    source: 'ISRO Bhuvan LULC Satellite Dataset (2015-2024)',
    sourceType: 'GIS/Satellite Dataset',
    year: '2024',
    finding: 'Satellite imagery verifies a 12.4% shift from agricultural cropland to built-up infrastructure in Nadia district.',
    coverage: 'Nadia District (West Bengal)',
    confidence: 'High Confidence (95%)',
  },
  {
    id: 'ev_02',
    source: 'West Bengal Land & Land Reforms Department Annual Report',
    sourceType: 'Government Dataset',
    year: '2024',
    finding: '86.4% of land records in Nadia have been digitized under DILRMP, reducing mutation turnaround time.',
    coverage: 'State-wide / Nadia',
    confidence: 'High Confidence (92%)',
  },
  {
    id: 'ev_03',
    source: 'ICAR National Agricultural Soil Health Census',
    sourceType: 'Statistical Report',
    year: '2023',
    finding: 'Topsoil quality degraded by 3.1% near Ranaghat brickfield cluster due to high clay extraction.',
    coverage: 'Ranaghat Block, Nadia',
    confidence: 'Medium Confidence (86%)',
  },
];

export const MOCK_RESEARCH_GAPS = [
  {
    id: 'gap_01',
    topic: 'Land Use & Disputes Interconnection',
    location: 'Nadia, West Bengal',
    gapSummary: 'Limited empirical research examines how rapid agricultural-to-urban land conversion directly triggers rural inheritance boundary disputes in Gangetic plains.',
    suggestedTitle: 'Spatial Correlation Between Agricultural Land Conversion and Boundary Disputes in Nadia',
    requiredData: ['LULC Sentinel-2 Maps', 'District Land Tribunal Case Registry', 'Cadastral Plot RoR'],
  },
  {
    id: 'gap_02',
    topic: 'Climate Resilience & Tenant Farming',
    location: 'Gangetic Delta Region',
    gapSummary: 'Insufficient documentation on how climate-induced flood inundation impacts oral tenant farmers without formal land lease agreements.',
    suggestedTitle: 'Vulnerability Assessment of Informal Tenant Farmers in Flood-Prone Agricultural Blocks',
    requiredData: ['Flood Hazard Zonation Map', 'Panchayat Tenant Registry', 'Crop Loss Claims Data'],
  },
];

export const MOCK_DATASETS = [
  {
    id: 'ds_01',
    name: 'ISRO Bhuvan Multi-Spectral LULC Time-Series',
    category: 'Land Use / Satellite',
    source: 'National Remote Sensing Centre (NRSC) / ISRO',
    location: 'Nadia & West Bengal Districts',
    timePeriod: '2015 – 2025 (Annual)',
    dataType: 'GeoTIFF / Raster Vector Layers',
    description: '10m resolution land use and land cover satellite raster dataset with 14 micro-land classification tags.',
    availability: 'Open Research Access (Demo Data)',
    evidenceStatus: 'High Confidence (ISRO Certified)',
  },
  {
    id: 'ds_02',
    name: 'DILRMP Digitized Record of Rights (RoR) Plot Registry',
    category: 'Land Records / Governance',
    source: 'West Bengal Land & Land Reforms Department',
    location: 'Krishnanagar & Ranaghat Blocks',
    timePeriod: '2020 – 2025',
    dataType: 'Vector GeoJSON & Structured JSON',
    description: 'Geo-referenced cadastral plot boundary registry with mutation timeline logs and dispute status markers.',
    availability: 'Restricted Academic Access (Demo Data)',
    evidenceStatus: 'High Confidence (Govt Registry)',
  },
  {
    id: 'ds_03',
    name: 'ICAR National Agricultural Soil Organic Carbon Survey',
    category: 'Agriculture / Environment',
    source: 'Indian Council of Agricultural Research (ICAR)',
    location: 'All India / Eastern Agro-Climatic Zone',
    timePeriod: '2018 – 2024',
    dataType: 'Tabular CSV & Spatial Heatmap',
    description: 'Soil health metrics including topsoil organic carbon percentage, nitrogen degradation, and clay extraction impact.',
    availability: 'Public Research Index (Demo Data)',
    evidenceStatus: 'High Confidence (ICAR Census)',
  },
  {
    id: 'ds_04',
    name: 'District Land Dispute Litigation & Tribunal Case Registry',
    category: 'Demographics / Policy',
    source: 'National Legal Services Authority (NALSA) & District Courts',
    location: 'Nadia & Murshidabad Districts',
    timePeriod: '2019 – 2024',
    dataType: 'Tabular Dataset & Case Code Index',
    description: '12,400+ anonymized land boundary dispute filings classified by inheritance fragmentation, mutation delay, and court latency.',
    availability: 'Anonymized Research Preview (Demo Data)',
    evidenceStatus: 'Medium Confidence (Judicial Registry)',
  },
];

export const MOCK_ACTIVE_RESEARCH_PROJECTS = [
  {
    id: 'proj_01',
    title: 'Agricultural Land Transformation & Shrinkage Analysis',
    location: 'Nadia, West Bengal',
    pipelineStep: 'Analysis → GIS Visualization',
    lastActivity: '2 hours ago',
    progressPercent: 75,
    keyFocus: 'Quantifying paddy cropland conversion along NH-34 corridor using Sentinel-2 time series.',
  },
  {
    id: 'proj_02',
    title: 'Urban Expansion & Land Tenure Disputes Correlation',
    location: 'Gangetic Plains, West Bengal',
    pipelineStep: 'Evidence → GIS Spatial Correlation',
    lastActivity: '1 day ago',
    progressPercent: 50,
    keyFocus: 'Mapping boundary litigation hotspots against un-updated ancestral RoRs.',
  },
  {
    id: 'proj_03',
    title: 'Soil Organic Carbon Sequestration under Agroforestry',
    location: 'Ahmednagar, Maharashtra',
    pipelineStep: 'Dataset Collection → Pattern Discovery',
    lastActivity: '3 days ago',
    progressPercent: 35,
    keyFocus: 'ICAR soil carbon recovery analysis across restored degraded land.',
  },
];

export const MOCK_RESEARCH_ACTIVITIES = [
  {
    time: 'TODAY, 10:42 AM',
    action: 'Analysed Sentinel-2 LULC Agricultural Land Dataset',
    category: 'Analysis',
  },
  {
    time: 'TODAY, 09:30 AM',
    action: 'Explored Nadia District GIS Cadastral Vector Layer',
    category: 'GIS',
  },
  {
    time: 'YESTERDAY',
    action: 'Saved 3 High-Confidence Research Evidence Items',
    category: 'Evidence',
  },
  {
    time: '2 DAYS AGO',
    action: 'Executed Multi-Temporal Land-Use Trend Comparison (2010–2025)',
    category: 'Patterns',
  },
];

export const MOCK_RESEARCH_PATTERNS_CHART_DATA = [
  { year: '2010', Agricultural: 64.5, BuiltUp: 18.2, Forest: 12.1, Water: 5.2 },
  { year: '2015', Agricultural: 58.8, BuiltUp: 22.4, Forest: 13.5, Water: 5.3 },
  { year: '2020', Agricultural: 54.1, BuiltUp: 27.6, Forest: 13.1, Water: 5.2 },
  { year: '2025', Agricultural: 52.1, BuiltUp: 30.6, Forest: 12.3, Water: 5.0 },
];

export const MOCK_KNOWLEDGE_NODES = [
  { label: 'Research Question', sub: 'Agricultural Land Change', color: 'bg-[#064e3b] text-white' },
  { label: 'Evidence', sub: 'NRSC Satellite Papers', color: 'bg-emerald-100 text-emerald-950 border border-emerald-300' },
  { label: 'Dataset', sub: 'Sentinel-2 & RoR Plots', color: 'bg-emerald-100 text-emerald-950 border border-emerald-300' },
  { label: 'GIS Layer', sub: 'LULC 10m Vector Overlay', color: 'bg-emerald-100 text-emerald-950 border border-emerald-300' },
  { label: 'Policy Impact', sub: 'RFCTLARR & DILRMP Policy', color: 'bg-emerald-100 text-emerald-950 border border-emerald-300' },
  { label: 'Governance', sub: 'Panchayat Land Records', color: 'bg-[#064e3b] text-white' },
];

// Helper functions for mock research queries
export const getFilteredResearch = ({ category, state, district, year, researchType, searchKeyword }) => {
  return MOCK_RESEARCH_PAPERS.filter((paper) => {
    if (category && category !== 'all' && paper.category !== category) return false;
    if (state && state !== 'All States' && paper.state !== state && paper.state !== 'All Districts') return false;
    if (district && district !== 'All Districts' && paper.district !== district && paper.district !== 'All Districts') return false;
    if (year && year !== 'All Years' && paper.year.toString() !== year.toString()) return false;
    if (researchType && researchType !== 'All Types' && paper.researchType !== researchType) return false;
    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      const matchTitle = paper.title.toLowerCase().includes(q);
      const matchSummary = paper.summary.toLowerCase().includes(q);
      const matchTags = paper.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchTags) return false;
    }
    return true;
  });
};

export const getAIResearchResponse = (question, location = 'Nadia, West Bengal') => {
  return {
    question: question,
    insight: `Based on satellite land-use data and agricultural census reports for ${location}, agricultural land conversion is primarily driven by suburban expansion along highway corridors, brickfield clay extractions, and fragmentation of family land holdings.`,
    confidenceScore: '92% (High Confidence)',
    evidenceList: MOCK_EVIDENCE_ITEMS,
    relatedGISLayers: ['LULC 2015-2025 Map', 'Cadastral Boundary Plot Layer', 'Urban Growth Vector'],
    suggestedGap: MOCK_RESEARCH_GAPS[0],
  };
};

