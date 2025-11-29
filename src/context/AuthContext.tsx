import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import api from '../services/api';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (payload: { name: string; email: string; password: string; role?: User['role'] }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('oemp_token');
    const storedUser = localStorage.getItem('oemp_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const persist = (newToken: string, newUser: User) => {
    localStorage.setItem('oemp_token', newToken);
    localStorage.setItem('oemp_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const login = async (credentials: { email: string; password: string }) => {
    const { data } = await api.post('/auth/login', credentials);
    persist(data.token, data.user);
  };

  const register = async (payload: { name: string; email: string; password: string; role?: User['role'] }) => {
    const { data } = await api.post('/auth/register', payload);
    persist(data.token, data.user);
  };

  const logout = () => {
    localStorage.removeItem('oemp_token');
    localStorage.removeItem('oemp_user');
    setUser(null);
    setToken(null);
  };

  const refreshProfile = async () => {
    if (!token) return;
    const { data } = await api.get('/auth/me');
    setUser(data.user);
    localStorage.setItem('oemp_user', JSON.stringify(data.user));
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout, refreshProfile, loading }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

