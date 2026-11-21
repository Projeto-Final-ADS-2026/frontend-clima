// src/services/tokenStorage.ts
// Guarda o JWT no localStorage (com fallback silencioso se o acesso for bloqueado).

const KEY = 'clima.token';

export const getToken = (): string | null => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const setToken = (token: string): void => {
  try {
    localStorage.setItem(KEY, token);
  } catch {
    /* ignorado */
  }
};

export const clearToken = (): void => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignorado */
  }
};
