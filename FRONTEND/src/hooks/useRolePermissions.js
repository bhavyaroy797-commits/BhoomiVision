import { useAuth } from './useAuth';
import { hasRoleAccess, roleAccessMap } from '../utils/roleAccessMap';

export const useRolePermissions = () => {
  const { user, selectedRole } = useAuth();
  const currentRole = user?.role || selectedRole;

  const canAccess = (path) => {
    return hasRoleAccess(currentRole, path);
  };

  const allowedRoutes = roleAccessMap[currentRole] || [];

  return {
    currentRole,
    canAccess,
    allowedRoutes,
  };
};
