// Frontend Demo GIS API Service for BHOOMIVISION GIS & Maps Module
// Designed for seamless Vercel / Static Deployment with full offline mock fallback

export const GIS_FEATURE_TABS = [
  { id: 'map', title: 'Interactive Map', desc: 'Explore India with layers, filters and analysis tools', icon: 'Map' },
  { id: 'lulc', title: 'Land Use & Land Cover', desc: 'View LULC changes and land cover maps', icon: 'Layers' },
  { id: 'satellite', title: 'Satellite Imagery', desc: 'High-resolution satellite images and time series', icon: 'Globe' },
  { id: 'thematic', title: 'Thematic Maps', desc: 'Custom maps for your research and analysis', icon: 'BarChart3' },
  { id: 'download', title: 'Download Data', desc: 'Get GIS data, shapefiles and reports', icon: 'Download' },
];

// Rich Demo Location Hierarchy & Spatial Analytics Data
export const MOCK_LOCATION_DATA = {
  'West Bengal': {
    'North 24 Parganas': {
      center: [22.7214, 88.4816],
      zoom: 11,
      blocks: {
        'Barasat': {
          totalAreaSqKm: 312,
          coordinates: [22.7214, 88.4816],
          lulc: [
            { name: 'Agricultural Land', percent: 46, prevPercent: 52, area: '143.5 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 24, prevPercent: 18, area: '74.8 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 14, prevPercent: 14, area: '43.6 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 9, prevPercent: 10.4, area: '28.0 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 7, prevPercent: 5.6, area: '22.1 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_01', type: 'Built-up Expansion', change: '+6.2%', trend: 'High Priority', priority: 'High', area: '19.3 km²' },
            { id: 'cd_02', type: 'Agricultural Conversion', change: '-5.8%', trend: 'Medium Priority', priority: 'Medium', area: '18.0 km²' },
            { id: 'cd_03', type: 'Vegetation Change', change: '-1.2%', trend: 'Low Priority', priority: 'Low', area: '3.7 km²' },
            { id: 'cd_04', type: 'Water-body Change', change: '-1.4%', trend: 'Medium Priority', priority: 'Medium', area: '4.3 km²' },
            { id: 'cd_05', type: 'Road / Infra Expansion', change: '+2.2%', trend: 'High Priority', priority: 'High', area: '6.8 km²' },
          ],
          riskLevel: {
            developmentPressure: 'HIGH',
            agriculturalConversion: 'MEDIUM',
            waterBodyRisk: 'LOW',
            overall: 'High Risk (Hotspot)',
          },
        },
        'Habra': {
          totalAreaSqKm: 285,
          coordinates: [22.8367, 88.6312],
          lulc: [
            { name: 'Agricultural Land', percent: 50, prevPercent: 56, area: '142.5 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 22, prevPercent: 16, area: '62.7 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 13, prevPercent: 13, area: '37.0 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 9, prevPercent: 10, area: '25.6 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 6, prevPercent: 5, area: '17.2 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_06', type: 'Built-up Expansion', change: '+6.0%', trend: 'High Priority', priority: 'High', area: '17.1 km²' },
            { id: 'cd_07', type: 'Agricultural Conversion', change: '-6.0%', trend: 'High Priority', priority: 'High', area: '17.1 km²' },
            { id: 'cd_08', type: 'Water-body Change', change: '-1.0%', trend: 'Medium Priority', priority: 'Medium', area: '2.8 km²' },
          ],
          riskLevel: {
            developmentPressure: 'HIGH',
            agriculturalConversion: 'HIGH',
            waterBodyRisk: 'MEDIUM',
            overall: 'High Risk',
          },
        },
        'Basirhat': {
          totalAreaSqKm: 410,
          coordinates: [22.6572, 88.8911],
          lulc: [
            { name: 'Agricultural Land', percent: 54, prevPercent: 58, area: '221.4 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 16, prevPercent: 12, area: '65.6 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 15, prevPercent: 15, area: '61.5 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 11, prevPercent: 12, area: '45.1 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 4, prevPercent: 3, area: '16.4 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_09', type: 'Built-up Expansion', change: '+4.0%', trend: 'Medium Priority', priority: 'Medium', area: '16.4 km²' },
            { id: 'cd_10', type: 'Water-body Change', change: '-1.0%', trend: 'Medium Priority', priority: 'Medium', area: '4.1 km²' },
          ],
          riskLevel: {
            developmentPressure: 'MEDIUM',
            agriculturalConversion: 'MEDIUM',
            waterBodyRisk: 'LOW',
            overall: 'Medium Risk',
          },
        },
      },
    },
    'Nadia': {
      center: [23.4012, 88.4975],
      zoom: 11,
      blocks: {
        'Krishnanagar': {
          totalAreaSqKm: 340,
          coordinates: [23.4012, 88.4975],
          lulc: [
            { name: 'Agricultural Land', percent: 58.4, prevPercent: 64.0, area: '198.5 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 18.2, prevPercent: 12.8, area: '61.8 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 12.7, prevPercent: 13.0, area: '43.1 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 6.1, prevPercent: 6.8, area: '20.7 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 4.6, prevPercent: 3.4, area: '15.6 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_11', type: 'Built-up Expansion', change: '+5.4%', trend: 'High Priority', priority: 'High', area: '18.3 km²' },
            { id: 'cd_12', type: 'Agricultural Conversion', change: '-5.6%', trend: 'High Priority', priority: 'High', area: '19.0 km²' },
          ],
          riskLevel: {
            developmentPressure: 'HIGH',
            agriculturalConversion: 'HIGH',
            waterBodyRisk: 'MEDIUM',
            overall: 'High Risk (Corridor)',
          },
        },
        'Ranaghat': {
          totalAreaSqKm: 295,
          coordinates: [23.1812, 88.5815],
          lulc: [
            { name: 'Agricultural Land', percent: 55, prevPercent: 61, area: '162.2 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 20, prevPercent: 14, area: '59.0 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 14, prevPercent: 14, area: '41.3 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 7, prevPercent: 8, area: '20.6 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 4, prevPercent: 3, area: '11.8 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_13', type: 'Built-up Expansion', change: '+6.0%', trend: 'High Priority', priority: 'High', area: '17.7 km²' },
            { id: 'cd_14', type: 'Road / Infra Expansion', change: '+3.1%', trend: 'High Priority', priority: 'High', area: '9.1 km²' },
          ],
          riskLevel: {
            developmentPressure: 'HIGH',
            agriculturalConversion: 'HIGH',
            waterBodyRisk: 'LOW',
            overall: 'High Risk',
          },
        },
      },
    },
    'South 24 Parganas': {
      center: [22.1912, 88.1915],
      zoom: 10,
      blocks: {
        'Diamond Harbour': {
          totalAreaSqKm: 380,
          coordinates: [22.1912, 88.1915],
          lulc: [
            { name: 'Agricultural Land', percent: 42, prevPercent: 46, area: '159.6 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 20, prevPercent: 16, area: '76.0 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 22, prevPercent: 22, area: '83.6 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 12, prevPercent: 13, area: '45.6 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 4, prevPercent: 3, area: '15.2 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_15', type: 'Built-up Expansion', change: '+4.0%', trend: 'Medium Priority', priority: 'Medium', area: '15.2 km²' },
          ],
          riskLevel: {
            developmentPressure: 'MEDIUM',
            agriculturalConversion: 'MEDIUM',
            waterBodyRisk: 'MEDIUM',
            overall: 'Medium Risk',
          },
        },
      },
    },
    'Kolkata': {
      center: [22.5726, 88.4149],
      zoom: 12,
      blocks: {
        'Salt Lake': {
          totalAreaSqKm: 120,
          coordinates: [22.5726, 88.4149],
          lulc: [
            { name: 'Agricultural Land', percent: 8, prevPercent: 12, area: '9.6 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 68, prevPercent: 62, area: '81.6 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 6, prevPercent: 6, area: '7.2 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 12, prevPercent: 14, area: '14.4 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 6, prevPercent: 6, area: '7.2 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_16', type: 'Built-up Expansion', change: '+6.0%', trend: 'High Priority', priority: 'High', area: '7.2 km²' },
            { id: 'cd_17', type: 'Water-body Change', change: '-2.0%', trend: 'High Priority', priority: 'High', area: '2.4 km²' },
          ],
          riskLevel: {
            developmentPressure: 'HIGH',
            agriculturalConversion: 'LOW',
            waterBodyRisk: 'HIGH',
            overall: 'High Risk (Wetland Pressure)',
          },
        },
      },
    },
  },
  'Tripura': {
    'West Tripura': {
      center: [23.8315, 91.2868],
      zoom: 11,
      blocks: {
        'Agartala': {
          totalAreaSqKm: 210,
          coordinates: [23.8315, 91.2868],
          lulc: [
            { name: 'Agricultural Land', percent: 38, prevPercent: 43, area: '79.8 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 28, prevPercent: 22, area: '58.8 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 26, prevPercent: 27, area: '54.6 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 5, prevPercent: 5.5, area: '10.5 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 3, prevPercent: 2.5, area: '6.3 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_18', type: 'Built-up Expansion', change: '+6.0%', trend: 'High Priority', priority: 'High', area: '12.6 km²' },
            { id: 'cd_19', type: 'Agricultural Conversion', change: '-5.0%', trend: 'Medium Priority', priority: 'Medium', area: '10.5 km²' },
          ],
          riskLevel: {
            developmentPressure: 'HIGH',
            agriculturalConversion: 'MEDIUM',
            waterBodyRisk: 'LOW',
            overall: 'High Urban Sprawl',
          },
        },
      },
    },
    'Sepahijala': {
      center: [23.6821, 91.2662],
      zoom: 11,
      blocks: {
        'Bishalgarh': {
          totalAreaSqKm: 260,
          coordinates: [23.6821, 91.2662],
          lulc: [
            { name: 'Agricultural Land', percent: 48, prevPercent: 53, area: '124.8 km²', color: '#22c55e' },
            { name: 'Built-up Area', percent: 18, prevPercent: 13, area: '46.8 km²', color: '#ef4444' },
            { name: 'Forest Land', percent: 24, prevPercent: 25, area: '62.4 km²', color: '#16a34a' },
            { name: 'Water Bodies', percent: 6, prevPercent: 6, area: '15.6 km²', color: '#0ea5e9' },
            { name: 'Barren / Other', percent: 4, prevPercent: 3, area: '10.4 km²', color: '#eab308' },
          ],
          changeDetection: [
            { id: 'cd_20', type: 'Built-up Expansion', change: '+5.0%', trend: 'Medium Priority', priority: 'Medium', area: '13.0 km²' },
          ],
          riskLevel: {
            developmentPressure: 'MEDIUM',
            agriculturalConversion: 'MEDIUM',
            waterBodyRisk: 'LOW',
            overall: 'Moderate Risk',
          },
        },
      },
    },
  },
};

export const MOCK_LULC_STATS = {
  areaName: 'North 24 Parganas (West Bengal)',
  totalAreaSqKm: 1248,
  population: '1,856,302 (2021 Census)',
  categories: [
    { name: 'Agricultural Land', percent: 46, prevPercent: 52, area: '574.0 km²', color: '#22c55e' },
    { name: 'Built-up Area', percent: 24, prevPercent: 18, area: '299.5 km²', color: '#ef4444' },
    { name: 'Forest Land', percent: 14, prevPercent: 14, area: '174.7 km²', color: '#16a34a' },
    { name: 'Water Bodies', percent: 9, prevPercent: 10.4, area: '112.3 km²', color: '#0ea5e9' },
    { name: 'Barren / Other', percent: 7, prevPercent: 5.6, area: '87.3 km²', color: '#eab308' },
  ],
};

export const MOCK_RECENT_MAPS = [
  {
    id: 'map_01',
    title: 'Land Use Land Cover - North 24 Parganas',
    date: '12 Mar 2026',
    layerType: 'LULC (Demo Layer)',
    format: 'GeoTIFF / Shapefile',
    size: '120 MB',
    status: 'Demo Dataset',
  },
  {
    id: 'map_02',
    title: 'Forest & Plantation Cover - West Bengal',
    date: '10 Mar 2026',
    layerType: 'Forest (Demo Layer)',
    format: 'Vector Shapefile',
    size: '45 MB',
    status: 'Illustrative Data',
  },
  {
    id: 'map_03',
    title: 'Soil Organic & Texture Map - India',
    date: '05 Mar 2026',
    layerType: 'Soil (Demo Layer)',
    format: 'KML / GeoJSON',
    size: '85 MB',
    status: 'Prototype Dataset',
  },
  {
    id: 'map_04',
    title: 'Digital Elevation Model (DEM) - India',
    date: '28 Feb 2026',
    layerType: 'Elevation (Demo Layer)',
    format: 'DEM Raster',
    size: '340 MB',
    status: 'Demo Dataset',
  },
];

export const MOCK_FEATURED_DATASETS = [
  {
    id: 'ds_01',
    title: 'Land Use Land Cover Dataset (LULC 2024-2026)',
    size: '2.4 GB',
    provider: 'ISRO Bhuvan & NRSC (Demo Stream)',
    format: 'GeoTIFF Grid (10m Resolution)',
    type: 'Land Classification',
    coverage: 'District Level',
    status: 'Demo Dataset',
  },
  {
    id: 'ds_02',
    title: 'Land Change Detection Dataset (Temporal Analysis)',
    size: '4.2 GB',
    provider: 'Sentinel-2 Copernicus (Demo Stream)',
    format: 'Multi-band Vector Change Matrix',
    type: 'Temporal Land Change',
    coverage: 'Selected Areas',
    status: 'Illustrative Dataset',
  },
  {
    id: 'ds_03',
    title: 'Field Verification Queue Dataset',
    size: '180 MB',
    provider: 'State Cadastral Survey & GIS Field Units',
    format: 'GeoJSON Point Vectors',
    type: 'Field Observations',
    coverage: 'Selected Districts',
    status: 'Prototype Dataset',
  },
  {
    id: 'ds_04',
    title: 'Spatial Risk & Sprawl Model Dataset',
    size: '1.8 GB',
    provider: 'BHOOMIVISION AI Risk Pipeline',
    format: 'Raster Hotspot Heatmap',
    type: 'Risk Indicators',
    coverage: 'Selected Areas',
    status: 'Illustrative Risk Model',
  },
  {
    id: 'ds_05',
    title: 'Satellite Observation Metadata Dataset',
    size: '540 MB',
    provider: 'Sentinel-2 & Landsat-9 Metadata Feed',
    format: 'JSON / Metadata Index',
    type: 'Satellite Imagery Metadata',
    coverage: 'Selected Areas',
    status: 'Demo Metadata',
  },
];

export const MOCK_DETECTED_CHANGES = [
  {
    id: 'chg_01',
    changeType: 'Built-up Expansion (+6.2%)',
    location: 'Barasat Sub-division, North 24 Parganas',
    period: '2024 – 2026',
    areaAffected: '19.3 km² (Cropland Conversion)',
    confidence: 'High Confidence (96%)',
    evidence: 'Sentinel-2 Multi-spectral NDVI Deficit (Illustrative)',
    priority: 'High Priority',
  },
  {
    id: 'chg_02',
    changeType: 'Agricultural Conversion (-5.8%)',
    location: 'Habra Block-II, North 24 Parganas',
    period: '2024 – 2026',
    areaAffected: '18.0 km² (Non-farm Transition)',
    confidence: 'High Confidence (94%)',
    evidence: 'Drone Cadastral Overlay (Illustrative)',
    priority: 'Medium Priority',
  },
  {
    id: 'chg_03',
    changeType: 'Water-body Change (-1.4%)',
    location: 'Basirhat & Krishnanagar Wetlands',
    period: '2024 – 2026',
    areaAffected: '4.3 km² (Inundation Shrinkage)',
    confidence: 'Medium Confidence (89%)',
    evidence: 'Landsat-9 SWIR Band Moisture Deficit',
    priority: 'Medium Priority',
  },
];

export const MOCK_GIS_EVIDENCE = [
  {
    id: 'gev_01',
    sourceType: 'Satellite Remote Sensing',
    sourceName: 'ISRO Bhuvan 10m LULC Dataset (2024-2026)',
    year: '2026',
    spatialCoverage: 'National / West Bengal & Tripura',
    evidenceStrength: 'High Confidence (96%)',
    status: 'Demo Layer',
  },
  {
    id: 'gev_02',
    sourceType: 'Government Boundary Survey',
    sourceName: 'Survey of India Digital Cadastral Boundary Database',
    year: '2025',
    spatialCoverage: 'State-wide Vector Layer',
    evidenceStrength: 'High Confidence (95%)',
    status: 'Demo Layer',
  },
];

export const MOCK_FIELD_VERIFICATION_QUEUE = [
  {
    id: 'fv_01',
    area: 'Barasat Sub-division',
    district: 'North 24 Parganas',
    reason: 'Rapid Built-up Land Change (+6.2%)',
    priority: 'High Priority',
    status: 'Pending Verification',
    lastObserved: '2 hours ago',
    coordinates: '22.7214° N, 88.4816° E',
  },
  {
    id: 'fv_02',
    area: 'Habra Block-II',
    district: 'North 24 Parganas',
    reason: 'Agricultural Cropland to Brickfield Transition (-5.8%)',
    priority: 'Medium Priority',
    status: 'Under Review',
    lastObserved: '1 day ago',
    coordinates: '22.8367° N, 88.6312° E',
  },
  {
    id: 'fv_03',
    area: 'Basirhat East',
    district: 'North 24 Parganas',
    reason: 'Wetland / Water-Body Change (-1.4%)',
    priority: 'Medium Priority',
    status: 'Pending Verification',
    lastObserved: '3 days ago',
    coordinates: '22.6572° N, 88.8911° E',
  },
  {
    id: 'fv_04',
    area: 'Krishnanagar North',
    district: 'Nadia',
    reason: 'Highway Transit Built-up Expansion',
    priority: 'High Priority',
    status: 'Under Review',
    lastObserved: '4 days ago',
    coordinates: '23.4012° N, 88.4975° E',
  },
];

export const MOCK_SPATIAL_RISK_MODELS = [
  {
    id: 'risk_01',
    category: 'Development Pressure',
    level: 'HIGH',
    color: 'bg-red-100 text-red-900 border-red-300',
    location: 'Barasat & NH-34 Corridor',
    summary: '+6.2% non-farm built-up expansion encroaching on double-crop paddy agricultural land.',
    modelLabel: 'Illustrative Risk Model',
  },
  {
    id: 'risk_02',
    category: 'Agricultural Conversion Risk',
    level: 'MEDIUM',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    location: 'Habra Block-II Peri-Urban Belt',
    summary: 'High cropland conversion density transitioning to brickfields and commercial storage sheds.',
    modelLabel: 'Illustrative Risk Model',
  },
  {
    id: 'risk_03',
    category: 'Environmental / Water-body Risk',
    level: 'LOW',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    location: 'Basirhat & East Wetlands',
    summary: 'Slight seasonal moisture variability with low immediate threat of permanent wetland encroachment.',
    modelLabel: 'Illustrative Risk Model',
  },
];

export const MOCK_SATELLITE_INTELLIGENCE = {
  provider: 'ISRO Bhuvan & Copernicus Sentinel-2',
  lastPassDate: '10 Sep 2026 (04:12 UTC)',
  cloudCover: '1.2% (Low Cloud Inundation)',
  resolution: '10m Multi-Spectral Spatial Resolution',
  activeSensors: ['B2 (Blue)', 'B3 (Green)', 'B4 (Red)', 'B8 (NIR)', 'B11 (SWIR)'],
  dataStatus: 'Demo Imagery / Demo Sync',
};

export const MOCK_SAVED_AREAS = [
  { id: 'sa_01', name: 'North 24 Parganas District', type: 'District Boundary', changesDetected: 4 },
  { id: 'sa_02', name: 'Barasat Sub-division', type: 'Sub-district Vector', changesDetected: 5 },
  { id: 'sa_03', name: 'Nadia NH-34 Highway Belt', type: 'Buffer Corridor', changesDetected: 7 },
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

// Predefined Canned Answers for "Ask the Map" AI Spatial Assistant
export const MOCK_ASK_MAP_RESPONSES = {
  'expansion': 'Based on the illustrative dataset, Barasat and Habra show high built-up expansion (+6.2%) encroaching on primary agricultural land.',
  'agricultural': 'Based on the illustrative dataset, Barasat and Habra have been flagged because agricultural cropland decreased from 52% to 46% between 2024 and 2026.',
  'verification': 'Based on the illustrative dataset, Barasat Sub-division, Habra Block-II, and Basirhat East are currently in the field verification queue due to recent land-use changes.',
  'pressure': 'Based on the illustrative dataset, the NH-34 transit corridor around Barasat and Krishnanagar exhibits HIGH development pressure.',
  'water': 'Based on the illustrative dataset, Basirhat wetlands show -1.4% water-body change requiring eco-monitoring.',
  'risk': 'Based on the illustrative dataset, Development Pressure is HIGH in Barasat, Agricultural Conversion Risk is MEDIUM in Habra, and Water-body Risk is LOW in Basirhat.',
};

export const getAIGISResponse = (query, location = 'Barasat, North 24 Parganas') => {
  const qLower = (query || '').toLowerCase();
  let matchedInsight = `AI Demo Insight: Spatial analysis for ${location} reveals 46% agricultural land coverage with +6.2% built-up expansion over 2024–2026 along primary highway transit corridors.`;

  if (qLower.includes('expansion') || qLower.includes('built-up')) {
    matchedInsight = `AI Demo Insight: ${MOCK_ASK_MAP_RESPONSES['expansion']}`;
  } else if (qLower.includes('agri') || qLower.includes('conversion') || qLower.includes('crop')) {
    matchedInsight = `AI Demo Insight: ${MOCK_ASK_MAP_RESPONSES['agricultural']}`;
  } else if (qLower.includes('verify') || qLower.includes('queue') || qLower.includes('field')) {
    matchedInsight = `AI Demo Insight: ${MOCK_ASK_MAP_RESPONSES['verification']}`;
  } else if (qLower.includes('pressure') || qLower.includes('development')) {
    matchedInsight = `AI Demo Insight: ${MOCK_ASK_MAP_RESPONSES['pressure']}`;
  } else if (qLower.includes('water') || qLower.includes('wetland')) {
    matchedInsight = `AI Demo Insight: ${MOCK_ASK_MAP_RESPONSES['water']}`;
  } else if (qLower.includes('risk') || qLower.includes('hotspot')) {
    matchedInsight = `AI Demo Insight: ${MOCK_ASK_MAP_RESPONSES['risk']}`;
  }

  return {
    query: query,
    insight: matchedInsight,
    confidence: '96% Confidence (Illustrative Result)',
    layersSuggested: ['LULC Sentinel-2 Raster (Demo Layer)', 'Cadastral Boundary Plot Overlay', 'Built-up Expansion Vector'],
    evidenceSources: MOCK_GIS_EVIDENCE,
  };
};

// Safe API Call Wrappers with Graceful Mock Fallbacks
export const fetchGISDatasets = async () => {
  try {
    return MOCK_FEATURED_DATASETS;
  } catch (err) {
    console.warn('Backend API unavailable. Returning fallback demo datasets.');
    return MOCK_FEATURED_DATASETS;
  }
};

export const fetchLULCStats = async (stateName, districtName, blockName) => {
  try {
    const loc = MOCK_LOCATION_DATA[stateName]?.[districtName]?.blocks?.[blockName];
    if (loc) return loc;
    return MOCK_LULC_STATS;
  } catch (err) {
    console.warn('Backend API unavailable. Returning fallback LULC stats.');
    return MOCK_LULC_STATS;
  }
};

