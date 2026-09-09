// Mock GIS API Service for BHOOMIVISION GIS & Maps Module

export const GIS_FEATURE_TABS = [
  { id: 'map', title: 'Interactive Map', desc: 'Explore India with layers, filters and analysis tools', icon: 'Map' },
  { id: 'lulc', title: 'Land Use & Land Cover', desc: 'View LULC changes and land cover maps', icon: 'Layers' },
  { id: 'satellite', title: 'Satellite Imagery', desc: 'High-resolution satellite images and time series', icon: 'Globe' },
  { id: 'thematic', title: 'Thematic Maps', desc: 'Custom maps for your research and analysis', icon: 'BarChart3' },
  { id: 'download', title: 'Download Data', desc: 'Get GIS data, shapefiles and reports', icon: 'Download' },
];

export const MOCK_LULC_STATS = {
  areaName: 'Nadia District (West Bengal)',
  totalAreaSqKm: 1248,
  population: '1,856,302 (2021 Census)',
  categories: [
    { name: 'Agricultural Land', percent: 58.4, area: '728.8 km²', color: '#22c55e' },
    { name: 'Built-up Area', percent: 18.2, area: '227.1 km²', color: '#ef4444' },
    { name: 'Forest Land', percent: 12.7, area: '158.5 km²', color: '#16a34a' },
    { name: 'Water Bodies', percent: 6.1, area: '76.1 km²', color: '#0ea5e9' },
    { name: 'Barren Land', percent: 4.6, area: '57.4 km²', color: '#eab308' },
  ],
};

export const MOCK_RECENT_MAPS = [
  {
    id: 'map_01',
    title: 'Land Use Land Cover - Nadia',
    date: '12 Mar 2025',
    layerType: 'LULC',
    format: 'GeoTIFF / Shapefile',
    size: '120 MB',
  },
  {
    id: 'map_02',
    title: 'Forest Cover - West Bengal',
    date: '10 Mar 2025',
    layerType: 'Forest',
    format: 'Vector Shapefile',
    size: '45 MB',
  },
  {
    id: 'map_03',
    title: 'Soil Type Map - India',
    date: '05 Mar 2025',
    layerType: 'Soil',
    format: 'KML / GeoJSON',
    size: '85 MB',
  },
  {
    id: 'map_04',
    title: 'Elevation Map - India',
    date: '28 Feb 2025',
    layerType: 'Elevation',
    format: 'DEM Raster',
    size: '340 MB',
  },
];

export const MOCK_FEATURED_DATASETS = [
  {
    id: 'ds_01',
    title: 'LULC India 2020-2023 Multi-Spectral',
    size: '2.4 GB',
    provider: 'ISRO Bhuvan & NRSC',
    format: 'GeoTIFF Grid (10m Resolution)',
  },
  {
    id: 'ds_02',
    title: 'Sentinel-2 Satellite Imagery Time-Series',
    size: '12.6 GB',
    provider: 'European Space Agency (ESA) Copernicus',
    format: 'Multi-band Imagery',
  },
  {
    id: 'ds_03',
    title: 'Soil Map (FAO / ICAR Standard)',
    size: '1.8 GB',
    provider: 'ICAR National Soil Survey',
    format: 'Vector Shapefile',
  },
  {
    id: 'ds_04',
    title: 'Administrative Boundaries (State, District, Block)',
    size: '540 MB',
    provider: 'Survey of India',
    format: 'GeoJSON / ESRI Shapefile',
  },
];

export const MOCK_DETECTED_CHANGES = [
  {
    id: 'chg_01',
    changeType: 'Agricultural → Built-up',
    location: 'Krishnanagar Sub-division, Nadia',
    period: '2015 – 2025',
    areaAffected: '14.2 km² (12.4% reduction in cropland)',
    confidence: 'High Confidence (96%)',
    evidence: 'Sentinel-2 Multi-spectral NDVI Deficit',
  },
  {
    id: 'chg_02',
    changeType: 'Vegetation → Urban Infrastructure',
    location: 'Ranaghat Industrial Corridor',
    period: '2020 – 2025',
    areaAffected: '8.6 km² (Highway Encroachment)',
    confidence: 'High Confidence (94%)',
    evidence: 'High-Res Drone Orthomosaic Overlay',
  },
];

export const MOCK_GIS_EVIDENCE = [
  {
    id: 'gev_01',
    sourceType: 'Satellite Remote Sensing',
    sourceName: 'ISRO Bhuvan 10m LULC Dataset (2024)',
    year: '2024',
    spatialCoverage: 'National / Nadia District',
    evidenceStrength: 'High Confidence (96%)',
  },
  {
    id: 'gev_02',
    sourceType: 'Government Boundary Survey',
    sourceName: 'Survey of India Digital Cadastral Boundary Database',
    year: '2025',
    spatialCoverage: 'State-wide Vector Layer',
    evidenceStrength: 'High Confidence (95%)',
  },
];

export const MOCK_FIELD_VERIFICATION_QUEUE = [
  {
    id: 'fv_01',
    area: 'Barasat Sub-division',
    district: 'North 24 Parganas',
    reason: 'Rapid Built-up Land Conversion near Highway',
    priority: 'High Priority',
    status: 'Pending Verification',
    lastObserved: '2 hours ago',
    coordinates: '22.7214° N, 88.4816° E',
  },
  {
    id: 'fv_02',
    area: 'Habra Block-II',
    district: 'North 24 Parganas',
    reason: 'Agricultural Cropland to Brickfield Transition',
    priority: 'Medium Priority',
    status: 'Under Field Review',
    lastObserved: '1 day ago',
    coordinates: '22.8367° N, 88.6312° E',
  },
  {
    id: 'fv_03',
    area: 'Krishnanagar North',
    district: 'Nadia',
    reason: 'Wetland / Water-Body Shrinkage Encroachment',
    priority: 'High Priority',
    status: 'Pending Verification',
    lastObserved: '3 days ago',
    coordinates: '23.4012° N, 88.4975° E',
  },
];

export const MOCK_SPATIAL_RISK_MODELS = [
  {
    id: 'risk_01',
    category: 'Land Dispute Risk Hotspot',
    level: 'High Risk',
    color: 'bg-red-100 text-red-900 border-red-300',
    location: 'Ranaghat & Barasat Corridor',
    summary: 'High boundary overlap density between ancestral RoR plots and geo-referenced drone vector layers.',
    modelLabel: 'Illustrative Risk Model',
  },
  {
    id: 'risk_02',
    category: 'Development / Sprawl Pressure',
    level: 'High Risk',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    location: 'NH-34 Transit Belt',
    summary: '+18.2% non-farm built-up expansion encroaching on primary double-crop paddy agricultural land.',
    modelLabel: 'Illustrative Risk Model',
  },
  {
    id: 'risk_03',
    category: 'Topsoil & Environmental Degradation',
    level: 'Medium Risk',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    location: 'Ranaghat Brickfield Cluster',
    summary: '3.1% soil organic carbon degradation due to topsoil clay extraction.',
    modelLabel: 'Illustrative Risk Model',
  },
];

export const MOCK_SATELLITE_INTELLIGENCE = {
  provider: 'ISRO Bhuvan & Copernicus Sentinel-2',
  lastPassDate: '08 Mar 2026 (04:12 UTC)',
  cloudCover: '1.2% (Low Cloud Inundation)',
  resolution: '10m Multi-Spectral Spatial Resolution',
  activeSensors: ['B2 (Blue)', 'B3 (Green)', 'B4 (Red)', 'B8 (NIR)', 'B11 (SWIR)'],
  dataStatus: 'Live Feed Connected (Demo Sync)',
};

export const MOCK_SAVED_AREAS = [
  { id: 'sa_01', name: 'North 24 Parganas District', type: 'District Boundary', changesDetected: 4 },
  { id: 'sa_02', name: 'Nadia NH-34 Highway Belt', type: 'Buffer Corridor', changesDetected: 7 },
  { id: 'sa_03', name: 'Barasat Peri-Urban Zone', type: 'Sub-division Vector', changesDetected: 3 },
];

export const MOCK_GIS_TOOLS = [
  { id: 't_01', name: 'Measure Distance', icon: 'Ruler' },
  { id: 't_02', name: 'Measure Area', icon: 'Maximize2' },
  { id: 't_03', name: 'Compare Layers', icon: 'Sliders' },
  { id: 't_04', name: 'Temporal Comparison', icon: 'Calendar' },
  { id: 't_05', name: 'Spatial Query', icon: 'Search' },
  { id: 't_06', name: 'Export Map', icon: 'Download' },
  { id: 't_07', name: 'Save Area', icon: 'Bookmark' },
  { id: 't_08', name: 'Generate Report', icon: 'FileText' },
];

export const getAIGISResponse = (query, location = 'Nadia, West Bengal') => {
  return {
    query: query,
    insight: `Spatial analysis for ${location} reveals 58.4% agricultural land coverage, but highlights high urban sprawl pressure (+18.2% built-up expansion) along primary highway transit corridors over 10 years.`,
    confidence: '96% (High Confidence)',
    layersSuggested: ['LULC Sentinel-2 Raster', 'Cadastral Boundary Plot Overlay', 'Built-up Expansion Vector'],
    evidenceSources: MOCK_GIS_EVIDENCE,
  };
};
