



SELECT current_database();
SELECT PostGIS_Version();
CREATE EXTENSION IF NOT EXISTS postgis;
SELECT PostGIS_Version();
SELECT ST_AsText(
    ST_GeomFromText('POINT(88.3639 22.5726)', 4326)
);
CREATE TABLE administrative_units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    parent_id INTEGER REFERENCES administrative_units(id),
    geometry GEOMETRY(MULTIPOLYGON, 4326)
);
CREATE TABLE villages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    district VARCHAR(150),
    block VARCHAR(150),
    state VARCHAR(150),
    lgd_code VARCHAR(50),
    geometry GEOMETRY(MULTIPOLYGON, 4326)
);
CREATE TABLE parcels (
    id SERIAL PRIMARY KEY,
    parcel_id VARCHAR(100) UNIQUE NOT NULL,
    survey_number VARCHAR(100),
    village_id INTEGER REFERENCES villages(id),
    area_hectare NUMERIC(12,4),
    recorded_land_type VARCHAR(100),
    geometry GEOMETRY(POLYGON, 4326)
);
CREATE TABLE land_records (
    id SERIAL PRIMARY KEY,
    parcel_id INTEGER REFERENCES parcels(id),
    khatian_number VARCHAR(100),
    recorded_land_type VARCHAR(100),
    land_classification VARCHAR(100),
    record_status VARCHAR(50),
    source VARCHAR(200),
    record_date DATE
);
CREATE TABLE satellite_images (
    id SERIAL PRIMARY KEY,
    image_id VARCHAR(150) UNIQUE,
    satellite VARCHAR(50),
    product_type VARCHAR(100),
    acquisition_date DATE,
    cloud_percentage NUMERIC(5,2),
    resolution_m INTEGER,
    file_path TEXT,
    geometry GEOMETRY(POLYGON, 4326)
);
CREATE TABLE lulc (
    id SERIAL PRIMARY KEY,
    parcel_id INTEGER REFERENCES parcels(id),
    year INTEGER,
    land_use_class VARCHAR(100),
    confidence NUMERIC(5,2),
    source VARCHAR(100)
);
CREATE TABLE land_use_changes (
    id SERIAL PRIMARY KEY,
    parcel_id INTEGER REFERENCES parcels(id),
    from_class VARCHAR(100),
    to_class VARCHAR(100),
    from_year INTEGER,
    to_year INTEGER,
    confidence NUMERIC(5,2),
    change_type VARCHAR(100),
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE risk_scores (
    id SERIAL PRIMARY KEY,
    parcel_id INTEGER REFERENCES parcels(id),
    risk_score NUMERIC(5,2),
    risk_level VARCHAR(20),
    land_change_score NUMERIC(5,2),
    record_mismatch_score NUMERIC(5,2),
    development_pressure_score NUMERIC(5,2),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    parcel_id INTEGER REFERENCES parcels(id),
    alert_type VARCHAR(100),
    severity VARCHAR(20),
    message TEXT,
    confidence NUMERIC(5,2),
    status VARCHAR(30) DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    document_type VARCHAR(100),
    source VARCHAR(300),
    document_url TEXT,
    local_path TEXT,
    publication_date DATE,
    description TEXT
);
CREATE TABLE grievances (
    id SERIAL PRIMARY KEY,
    parcel_id INTEGER REFERENCES parcels(id),
    title TEXT,
    description TEXT,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_villages_geometry
ON villages USING GIST (geometry);

CREATE INDEX idx_parcels_geometry
ON parcels USING GIST (geometry);

CREATE INDEX idx_admin_geometry
ON administrative_units USING GIST (geometry);
CREATE INDEX idx_parcel_id
ON parcels(parcel_id);

CREATE INDEX idx_survey_number
ON parcels(survey_number);

CREATE INDEX idx_village_id
ON parcels(village_id);

CREATE INDEX idx_lulc_parcel_year
ON lulc(parcel_id, year);

CREATE INDEX idx_risk_parcel
ON risk_scores(parcel_id);
CREATE VIEW parcel_intelligence AS
SELECT
    p.parcel_id,
    p.survey_number,
    p.area_hectare,
    p.recorded_land_type,

    lc.from_class,
    lc.to_class,
    lc.confidence AS change_confidence,

    rs.risk_score,
    rs.risk_level,

    p.geometry

FROM parcels p

LEFT JOIN land_use_changes lc
    ON p.id = lc.parcel_id

LEFT JOIN risk_scores rs
    ON p.id = rs.parcel_id;
	SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
INSERT INTO villages (
    name,
    district,
    block,
    state,
    lgd_code,
    geometry
)
VALUES (
    'Test Village',
    'North 24 Parganas',
    'Barasat',
    'West Bengal',
    'TEST001',
    ST_GeomFromText(
        'POLYGON((
            88.45 22.75,
            88.46 22.75,
            88.46 22.76,
            88.45 22.76,
            88.45 22.75
        ))',
        4326
    )
);
SELECT
    id,
    name,
    district,
    block,
    state,
    ST_AsText(geometry) AS boundary
FROM villages;
SELECT id, name
FROM villages;
INSERT INTO parcels (
    parcel_id,
    survey_number,
    village_id,
    area_hectare,
    recorded_land_type,
    geometry
)
VALUES (
    'TEST-P001',
    'TEST-101',
    1,
    1.25,
    'Agricultural',
    ST_GeomFromText(
        'POLYGON((
            88.452 22.752,
            88.456 22.752,
            88.456 22.756,
            88.452 22.756,
            88.452 22.752
        ))',
        4326
    )
);
SELECT
    id,
    parcel_id,
    survey_number,
    village_id,
    area_hectare,
    recorded_land_type,
    ST_AsText(geometry) AS boundary
FROM parcels;
SELECT
    p.parcel_id,
    v.name AS village,
    ST_Within(p.geometry, v.geometry) AS parcel_inside_village
FROM parcels p
JOIN villages v
    ON p.village_id = v.id;
	CREATE INDEX idx_villages_geometry
ON villages USING GIST (geometry);

CREATE INDEX idx_parcels_geometry
ON parcels USING GIST (geometry);

CREATE INDEX idx_admin_geometry
ON administrative_units USING GIST (geometry);

CREATE INDEX idx_satellite_geometry
ON satellite_images USING GIST (geometry);
CREATE INDEX idx_parcel_id
ON parcels(parcel_id);

CREATE INDEX idx_survey_number
ON parcels(survey_number);

CREATE INDEX idx_village_id
ON parcels(village_id);

CREATE INDEX idx_lulc_parcel_year
ON lulc(parcel_id, year);

CREATE INDEX idx_risk_parcel
ON risk_scores(parcel_id);
CREATE OR REPLACE VIEW parcel_intelligence AS
SELECT
    p.parcel_id,
    p.survey_number,
    p.area_hectare,
    p.recorded_land_type,
    lc.from_class,
    lc.to_class,
    lc.confidence AS change_confidence,
    rs.risk_score,
    rs.risk_level,
    p.geometry
FROM parcels p
LEFT JOIN land_use_changes lc
    ON p.id = lc.parcel_id
LEFT JOIN risk_scores rs
    ON p.id = rs.parcel_id;
	SELECT *
FROM parcel_intelligence;
-- 1. State Level
INSERT INTO administrative_units (name, type, parent_id)
VALUES ('West Bengal', 'State', NULL);

-- 2. District Level (assuming State ID is 1)
INSERT INTO administrative_units (name, type, parent_id)
VALUES ('North 24 Parganas', 'District', 1);

-- 3. Sub-District / Block Level (assuming District ID is 2)
INSERT INTO administrative_units (name, type, parent_id)
VALUES ('Barasat-I', 'Block', 2);

-- 4. Gram Panchayat Level (assuming Barasat-I ID is 3)
INSERT INTO administrative_units (name, type, parent_id) VALUES
('Chhoto Jagulia', 'Gram Panchayat', 3),
('Dattapukur-I', 'Gram Panchayat', 3),
('Dattapukur-II', 'Gram Panchayat', 3),
('Ichhapur-Nilganj', 'Gram Panchayat', 3),
('Kadambagachhi', 'Gram Panchayat', 3),
('Kashimpur', 'Gram Panchayat', 3),
('Kotra', 'Gram Panchayat', 3),
('Paschim Khilkapur', 'Gram Panchayat', 3),
('Purba Khilkapur', 'Gram Panchayat', 3);
INSERT INTO villages (name, district, block, state, lgd_code, geometry) VALUES
('Ahira', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323165', NULL),
('Algaria', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323150', NULL),
('Ariala', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323147', NULL),
('Babpur', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323146', NULL),
('Bahera', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323191', NULL),
('Bamangachhi (Ct)', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323225', NULL),
('Chhota Jagulia', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323190', NULL),
('Kadambagachhi', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323212', NULL),
('Kashimpur', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323175', NULL),
('Kotra', 'North 24 Parganas', 'Barasat-I', 'West Bengal', '323204', NULL);
-- Add the remaining 72 villages from the list
SELECT id, name, lgd_code FROM villages WHERE lgd_code = '323212'; -- Kadambagachhi
INSERT INTO parcels (
    parcel_id, 
    survey_number, 
    village_id, 
    area_hectare, 
    recorded_land_type, 
    geometry
)
VALUES (
    'WB-N24P-323212-PL001',
    '412/1',
    (SELECT id FROM villages WHERE lgd_code = '323212'),
    0.4500,
    'Shali (Agricultural)',
    ST_GeomFromText('POLYGON((88.481 22.712, 88.485 22.712, 88.485 22.716, 88.481 22.716, 88.481 22.712))', 4326)
);
INSERT INTO parcels (
    parcel_id,
    survey_number,
    village_id,
    area_hectare,
    recorded_land_type,
    geometry
)
VALUES (
    'WB-BAR1-323212-00101',
    '101',
    (SELECT id FROM villages WHERE lgd_code = '323212' LIMIT 1),
    0.8500,
    'Agricultural',
    ST_GeomFromText('POLYGON((88.4812 22.7125, 88.4845 22.7125, 88.4845 22.7158, 88.4812 22.7158, 88.4812 22.7125))', 4326)
);
INSERT INTO land_records (
    parcel_id,
    khatian_number,
    recorded_land_type,
    land_classification,
    record_status,
    source,
    record_date
)
VALUES (
    (SELECT id FROM parcels WHERE parcel_id = 'WB-BAR1-323212-00101'),
    'KH-8842',
    'Shali',
    'Private Agricultural',
    'VERIFIED',
    'Banglarbhumi RoR',
    '2026-01-15'
);
INSERT INTO satellite_images (
    image_id,
    satellite,
    product_type,
    acquisition_date,
    cloud_percentage,
    resolution_m,
    file_path,
    geometry
)
VALUES (
    'S2A_MSIL2A_20260815_BARASAT',
    'Sentinel-2A',
    'L2A Surface Reflectance',
    '2026-08-15',
    2.40,
    10,
    '/data/raster/sentinel/2026/barasat_20260815.tif',
    ST_GeomFromText('POLYGON((88.40 22.65, 88.55 22.65, 88.55 22.80, 88.40 22.80, 88.40 22.65))', 4326)
);
INSERT INTO satellite_images (
    image_id,
    satellite,
    product_type,
    acquisition_date,
    cloud_percentage,
    resolution_m,
    file_path,
    geometry
)
VALUES (
    'S2A_MSIL2A_20260815_BARASAT',
    'Sentinel-2A',
    'L2A Surface Reflectance',
    '2026-08-15',
    2.40,
    10,
    '/data/raster/sentinel/2026/barasat_20260815.tif',
    ST_GeomFromText('POLYGON((88.40 22.65, 88.55 22.65, 88.55 22.80, 88.40 22.80, 88.40 22.65))', 4326)
);
-- 1. Base LULC snapshot
INSERT INTO lulc (parcel_id, year, land_use_class, confidence, source)
VALUES (
    (SELECT id FROM parcels WHERE parcel_id = 'WB-BAR1-323212-00101'),
    2026,
    'Built-up / Construction',
    92.50,
    'RandomForest_v2'
);

-- 2. Detected Change Event
INSERT INTO land_use_changes (
    parcel_id,
    from_class,
    to_class,
    from_year,
    to_year,
    confidence,
    change_type
)
VALUES (
    (SELECT id FROM parcels WHERE parcel_id = 'WB-BAR1-323212-00101'),
    'Agricultural',
    'Built-up',
    2023,
    2026,
    89.00,
    'Unauthorized Conversion'
);
-- 1. Parcel risk evaluation
INSERT INTO risk_scores (
    parcel_id,
    risk_score,
    risk_level,
    land_change_score,
    record_mismatch_score,
    development_pressure_score
)
VALUES (
    (SELECT id FROM parcels WHERE parcel_id = 'WB-BAR1-323212-00101'),
    78.50,
    'HIGH',
    85.00,
    80.00,
    70.50
);

-- 2. Actionable alert trigger
INSERT INTO alerts (
    parcel_id,
    alert_type,
    severity,
    message,
    confidence,
    status
)
VALUES (
    (SELECT id FROM parcels WHERE parcel_id = 'WB-BAR1-323212-00101'),
    'Encroachment / Illegal Conversion',
    'HIGH',
    'Farmland converted to built-up area without revenue change approval.',
    89.00,
    'NEW'
);
SELECT 
    parcel_id,
    survey_number,
    recorded_land_type,
    from_class,
    to_class,
    risk_score,
    risk_level,
    ST_AsText(geometry) AS wkt_geom
FROM parcel_intelligence;
INSERT INTO documents (
    title,
    document_type,
    source,
    document_url,
    local_path,
    publication_date,
    description
)
VALUES (
    'North 24 Parganas District Land Use Policy 2026',
    'Master Plan / Gazette',
    'Department of Land and Land Reforms, WB',
    'https://banglarbhumi.gov.in/docs/n24p_zoning_2026.pdf',
    '/var/data/bhoomivision/documents/n24p_zoning_2026.pdf',
    '2026-03-01',
    'Official zoning and permissible land-use classifications for Barasat-I block.'
);
INSERT INTO grievances (
    parcel_id,
    title,
    description,
    category,
    status
)
VALUES (
    (SELECT id FROM parcels WHERE parcel_id = 'WB-BAR1-323212-00101' LIMIT 1),
    'Unauthorized boundary wall on farmland',
    'Construction spotted on agricultural plot without updated conversion deed.',
    'Illegal Construction',
    'OPEN'
);
SELECT 
    p.parcel_id,
    p.survey_number,
    v.name AS village_name,
    r.risk_score,
    r.risk_level,
    a.message AS active_alert
FROM parcels p
JOIN villages v ON p.village_id = v.id
JOIN risk_scores r ON p.id = r.parcel_id
LEFT JOIN alerts a ON p.id = a.parcel_id AND a.status = 'NEW'
WHERE v.name = 'Kadambagachhi'
  AND r.risk_level = 'HIGH'
ORDER BY r.risk_score DESC;
SELECT 
    p.parcel_id,
    s.image_id,
    s.acquisition_date,
    s.file_path
FROM parcels p
JOIN satellite_images s 
  ON ST_Intersects(p.geometry, s.geometry)
WHERE p.parcel_id = 'WB-BAR1-323212-00101';
SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(t.*)::json)
)
FROM (
    SELECT 
        p.id,
        p.parcel_id,
        p.survey_number,
        p.area_hectare,
        p.recorded_land_type,
        r.risk_score,
        r.risk_level,
        p.geometry
    FROM parcels p
    LEFT JOIN risk_scores r ON p.id = r.parcel_id
) AS t;
-- 1. Administrative Units
INSERT INTO administrative_units (id, name, type, parent_id, geometry) VALUES
(1, 'West Bengal', 'State', NULL, ST_GeomFromText('MULTIPOLYGON(((85.8 21.5, 89.9 21.5, 89.9 27.2, 85.8 27.2, 85.8 21.5)))', 4326)),
(2, 'North 24 Parganas', 'District', 1, ST_GeomFromText('MULTIPOLYGON(((88.3 22.4, 88.9 22.4, 88.9 23.2, 88.3 23.2, 88.3 22.4)))', 4326));

-- 2. Villages
INSERT INTO villages (id, name, district, block, state, lgd_code, geometry) VALUES
(1, 'Rajarhat Gopalpur', 'North 24 Parganas', 'Rajarhat', 'West Bengal', 'LGD-WB-70101', ST_GeomFromText('MULTIPOLYGON(((88.450 22.580, 88.490 22.580, 88.490 22.620, 88.450 22.620, 88.450 22.580)))', 4326)),
(2, 'Barasat Rural', 'North 24 Parganas', 'Barasat I', 'West Bengal', 'LGD-WB-70102', ST_GeomFromText('MULTIPOLYGON(((88.450 22.750, 88.500 22.750, 88.500 22.800, 88.450 22.800, 88.450 22.750)))', 4326));

-- 3. Parcels
INSERT INTO parcels (id, parcel_id, survey_number, village_id, area_hectare, recorded_land_type, geometry) VALUES
(1, 'WB-N24-001', 'DAG-101/A', 1, 0.4500, 'Agricultural', ST_GeomFromText('POLYGON((88.452 22.582, 88.456 22.582, 88.456 22.586, 88.452 22.586, 88.452 22.582))', 4326)),
(2, 'WB-N24-002', 'DAG-102/B', 1, 0.8200, 'Agricultural', ST_GeomFromText('POLYGON((88.457 22.582, 88.462 22.582, 88.462 22.587, 88.457 22.587, 88.457 22.582))', 4326)),
(3, 'WB-N24-003', 'DAG-205',   2, 1.2500, 'Wetland / Water body', ST_GeomFromText('POLYGON((88.452 22.752, 88.458 22.752, 88.458 22.758, 88.452 22.758, 88.452 22.752))', 4326)),
(4, 'WB-N24-004', 'DAG-310',   2, 0.3100, 'Homestead / Residential', ST_GeomFromText('POLYGON((88.460 22.760, 88.464 22.760, 88.464 22.764, 88.460 22.764, 88.460 22.760))', 4326)),
(5, 'WB-N24-005', 'DAG-412',   1, 2.1000, 'Commercial / Industrial', ST_GeomFromText('POLYGON((88.465 22.588, 88.472 22.588, 88.472 22.595, 88.465 22.595, 88.465 22.588))', 4326));

-- 4. Land Records
INSERT INTO land_records (parcel_id, khatian_number, recorded_land_type, land_classification, record_status, source, record_date) VALUES
(1, 'KH-4521', 'Agricultural', 'Sali (Single Crop)', 'ACTIVE', 'Banglarbhumi State Portal', '2021-04-15'),
(2, 'KH-4522', 'Agricultural', 'Sona (Multi Crop)', 'ACTIVE', 'Banglarbhumi State Portal', '2021-04-15'),
(3, 'KH-8801', 'Wetland / Water body', 'Pond / Jalashay', 'ACTIVE', 'District Land Reforms Office', '2019-11-10'),
(4, 'KH-9102', 'Homestead / Residential', 'Bastu', 'ACTIVE', 'Banglarbhumi State Portal', '2022-01-20'),
(5, 'KH-1023', 'Commercial / Industrial', 'Karkhana', 'ACTIVE', 'WBIDFC Ledger', '2020-08-05');

-- 5. Satellite Images
INSERT INTO satellite_images (image_id, satellite, product_type, acquisition_date, cloud_percentage, resolution_m, file_path, geometry) VALUES
('IMG-S2A-20220115', 'Sentinel-2A', 'L2A Surface Reflectance', '2022-01-15', 1.20, 10, '/rasters/2022/s2a_20220115_n24.tif', ST_GeomFromText('POLYGON((88.40 22.50, 88.60 22.50, 88.60 22.85, 88.40 22.85, 88.40 22.50))', 4326)),
('IMG-S2B-20251210', 'Sentinel-2B', 'L2A Surface Reflectance', '2025-12-10', 0.50, 10, '/rasters/2025/s2b_20251210_n24.tif', ST_GeomFromText('POLYGON((88.40 22.50, 88.60 22.50, 88.60 22.85, 88.40 22.85, 88.40 22.50))', 4326));

-- 6. LULC Time Series
INSERT INTO lulc (parcel_id, year, land_use_class, confidence, source) VALUES
(1, 2021, 'Cropland', 94.50, 'RandomForest Classifier v1.2'),
(1, 2025, 'Built-up / Commercial', 91.20, 'DeepLabV3+ Model v2.0'),
(2, 2021, 'Cropland', 96.00, 'RandomForest Classifier v1.2'),
(2, 2025, 'Cropland', 95.80, 'DeepLabV3+ Model v2.0'),
(3, 2021, 'Waterbody', 98.10, 'RandomForest Classifier v1.2'),
(3, 2025, 'Built-up / Construction Site', 89.70, 'DeepLabV3+ Model v2.0'),
(4, 2021, 'Residential', 97.50, 'RandomForest Classifier v1.2'),
(4, 2025, 'Residential', 97.10, 'DeepLabV3+ Model v2.0'),
(5, 2021, 'Barren Land', 92.00, 'RandomForest Classifier v1.2'),
(5, 2025, 'Industrial Building', 93.40, 'DeepLabV3+ Model v2.0');

-- 7. Land Use Changes
INSERT INTO land_use_changes (parcel_id, from_class, to_class, from_year, to_year, confidence, change_type, detected_at) VALUES
(1, 'Cropland', 'Built-up / Commercial', 2021, 2025, 91.20, 'Unauthorized Commercialization', '2026-01-10 10:30:00'),
(3, 'Waterbody', 'Built-up / Construction Site', 2021, 2025, 89.70, 'Wetland Encroachment / Illegal Filling', '2026-01-12 14:15:00'),
(5, 'Barren Land', 'Industrial Building', 2021, 2025, 93.40, 'Approved Industrialization', '2026-01-14 09:45:00');

-- 8. Risk Scores
INSERT INTO risk_scores (parcel_id, risk_score, risk_level, land_change_score, record_mismatch_score, development_pressure_score, calculated_at) VALUES
(1, 78.50, 'HIGH', 85.00, 80.00, 70.50, '2026-01-15 09:00:00'),
(2, 12.00, 'LOW', 5.00, 10.00, 21.00, '2026-01-15 09:00:00'),
(3, 92.40, 'CRITICAL', 95.00, 98.00, 84.20, '2026-01-15 09:00:00'),
(4, 18.30, 'LOW', 8.00, 15.00, 31.90, '2026-01-15 09:00:00'),
(5, 35.10, 'MEDIUM', 40.00, 20.00, 45.30, '2026-01-15 09:00:00');

-- 9. System Alerts
INSERT INTO alerts (parcel_id, alert_type, severity, message, confidence, status, created_at) VALUES
(1, 'UNAUTHORIZED_LAND_USE_CHANGE', 'HIGH', 'Agricultural parcel WB-N24-001 converted to commercial structure without revenue conversion approval.', 91.20, 'NEW', '2026-01-16 08:30:00'),
(3, 'ILLEGAL_WETLAND_FILLING', 'CRITICAL', 'Protected waterbody WB-N24-003 detected as filled/built-up area in latest Sentinel-2 analysis.', 89.70, 'NEW', '2026-01-16 08:35:00');

-- 10. Policy Documents
INSERT INTO documents (title, document_type, source, document_url, local_path, publication_date, description) VALUES
('SVAMITVA Scheme Implementation Guidelines', 'Policy / Guidelines', 'Ministry of Panchayati Raj', 'https://svamitva.nic.in/guidelines.pdf', '/docs/svamitva_guidelines.pdf', '2021-03-12', 'Official guidelines for drone surveys and property card issuance in rural inhabited areas.'),
('West Bengal Land Reforms Act 1955', 'Statute / Act', 'Government of West Bengal', 'https://banglarbhumi.gov.in/act1955.pdf', '/docs/wblr_act_1955.pdf', '1955-03-31', 'Legal framework for land classification, conversion permissions (Section 4C), and khatian management.'),
('SOP for Drone Survey and Mapping in Rural Abadi Areas', 'Technical Standard', 'Survey of India', 'https://surveyofindia.gov.in/sop_drone.pdf', '/docs/soi_drone_sop_v2.pdf', '2022-09-18', 'Standard Operating Procedure for image processing, feature extraction, and feature vector accuracy.');

-- 11. Public Grievances
INSERT INTO grievances (parcel_id, title, description, category, status, created_at) VALUES
(1, 'Disputed Commercial Construction', 'Neighboring construction ongoing on agricultural land without local Gram Panchayat permission.', 'Illegal Construction', 'OPEN', '2026-01-18 11:20:00'),
(3, 'Illegal Pond Reclamation', 'Commercial real estate developer dumping debris into public pond plot DAG-205.', 'Wetland Encroachment', 'UNDER_INVESTIGATION', '2026-01-20 16:45:00');



