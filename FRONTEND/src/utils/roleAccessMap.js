import { ROLES } from './constants';

export const roleAccessMap = {
  [ROLES.PUBLIC]: [
    '/dashboard/public',
    '/home',
    '/research',
    '/policy-innovation',
    '/gis-maps',
    '/reports',
    '/grievance',
    '/profile',
  ],
  [ROLES.RESEARCHER]: [
    '/dashboard/researcher',
    '/home',
    '/research',
    '/policy-innovation',
    '/gis-maps',
    '/reports',
    '/profile',
  ],
  [ROLES.GIS_OFFICER]: [
    '/dashboard/gis',
    '/home',
    '/gis-maps',
    '/land-governance',
    '/reports',
    '/profile',
  ],
  [ROLES.GOVT_OFFICER]: [
    '/dashboard/govt',
    '/home',
    '/land-governance',
    '/policy-innovation',
    '/reports',
    '/profile',
  ],
  [ROLES.ADMIN]: [
    '/dashboard/admin',
    '/admin',
    '/home',
    '/research',
    '/policy-innovation',
    '/land-governance',
    '/gis-maps',
    '/reports',
    '/grievance',
    '/profile',
  ],
};

export const hasRoleAccess = (role, path) => {
  if (!role) return false;
  if (role === ROLES.ADMIN) return true;
  const allowedPaths = roleAccessMap[role] || [];
  return allowedPaths.some((allowed) => path.startsWith(allowed));
};
