// src/context/AuthContext.tsx

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth';
import * as authApi from '../services/authApi';
import { setUnauthorizedHandler } from '../services/http';
import { clearToken, getToken, setToken } from '../services/tokenStorage';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => getToken() !== null);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const applyAuth = useCallback((res: AuthResponse) => {
    setToken(res.token);
    setUser(res.user);
  }, []);

  // Restaura a sessão a partir do token salvo
  useEffect(() => {
    if (!getToken()) return;
    authApi
      .getMe()
      .then(setUser)
      .catch(() => logout())
      .finally(() => setIsLoading(false));
  }, [logout]);

  // Sessão expirada em qualquer chamada autenticada => volta para o login
  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      login: async (payload) => applyAuth(await authApi.login(payload)),
      register: async (payload) => applyAuth(await authApi.register(payload)),
      logout,
    }),
    [user, isLoading, applyAuth, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
