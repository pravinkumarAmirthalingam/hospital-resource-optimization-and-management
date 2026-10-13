import { createContext, useContext, useState, useCallback } from 'react';
import { SEEDED_USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('hrs_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username, password) => {
    const found = SEEDED_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      throw new Error('Invalid username or password');
    }

    const userData = {
      username: found.username,
      role: found.role,
      credentials: btoa(`${found.username}:${found.password}`),
    };

    sessionStorage.setItem('hrs_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('hrs_user');
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role ?? null,
    credentials: user?.credentials ?? null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
