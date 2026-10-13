import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const roleHomePaths = {
  SUPER_ADMIN: '/super-admin',
  HOSPITAL_ADMIN: '/hospital-admin',
  PUBLIC_USER: '/public',
};

/**
 * Protects a route — redirects to /login if not authenticated
 * and to the role's home if the user doesn't have the required role.
 */
export function RoleGuard({ allowedRoles, children }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={roleHomePaths[role] || '/login'} replace />;
  }

  return children;
}

/**
 * Redirects authenticated users away from /login to their dashboard.
 */
export function GuestGuard({ children }) {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={roleHomePaths[role] || '/'} replace />;
  }

  return children;
}

export { roleHomePaths };
