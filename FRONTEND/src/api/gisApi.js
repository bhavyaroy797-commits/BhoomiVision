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

export const getAIGISResponse = (query, location = 'Nadia, West Bengal') => {
  return {
    query: query,
    insight: `Spatial analysis for ${location} reveals 58.4% agricultural land coverage, but highlights high urban sprawl pressure (+18.2% built-up expansion) along primary highway transit corridors over 10 years.`,
    confidence: '96% (High Confidence)',
    layersSuggested: ['LULC Sentinel-2 Raster', 'Cadastral Boundary Plot Overlay', 'Built-up Expansion Vector'],
    evidenceSources: MOCK_GIS_EVIDENCE,
  };
};
