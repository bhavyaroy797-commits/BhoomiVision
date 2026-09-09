export const ROLES = {
  PUBLIC: 'PUBLIC',
  RESEARCHER: 'RESEARCHER',
  GIS_OFFICER: 'GIS_OFFICER',
  GOVT_OFFICER: 'GOVT_OFFICER',
  ADMIN: 'ADMIN',
};

export const ROLE_LABELS = {
  [ROLES.PUBLIC]: 'Public User',
  [ROLES.RESEARCHER]: 'Researcher / Analyst',
  [ROLES.GIS_OFFICER]: 'GIS Field Officer',
  [ROLES.GOVT_OFFICER]: 'Govt. Officer / Policy Maker',
  [ROLES.ADMIN]: 'System Admin',
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.PUBLIC]: 'Explore general information, view maps and access basic research.',
  [ROLES.RESEARCHER]: 'Access detailed research, datasets, reports and advanced analysis tools.',
  [ROLES.GIS_OFFICER]: 'Use spatial data, maps and field reporting tools for on-ground work.',
  [ROLES.GOVT_OFFICER]: 'Access policy documents, governance tools and decision support systems.',
  [ROLES.ADMIN]: 'Manage users, data and platform settings.',
};

export const MOCK_USERS = {
  PUBLIC: {
    id: 'usr_pub_01',
    name: 'Ratnadeep Nath',
    email: 'ratnadeepnath@gmail.com',
    phone: '+91 98765 43210',
    location: 'Nadia, West Bengal',
    joinedDate: '12 Mar 2025',
    role: ROLES.PUBLIC,
    organization: 'Citizen Access',
    designation: 'General Citizen / Public User',
    bio: 'Exploring land information, governance transparency, and public GIS maps.',
  },
};
