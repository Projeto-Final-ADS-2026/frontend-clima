// src/services/http.ts
// Cliente HTTP único: injeta o JWT e notifica a aplicação quando a sessão expira (401).

import { getToken } from './tokenStorage';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  onUnauthorized = handler;
};

// Só desloga se o servidor confirmar que o token é inválido; um 401 isolado não derruba a sessão.
async function tokenIsValid(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.status !== 401;
  } catch {
    return true; // sem conexão não prova que o token é inválido
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  if (response.status === 401 && token && !(await tokenIsValid(token))) {
    onUnauthorized?.();
  }
  if (!response.ok) {
    throw new HttpError(response.status, `Erro ${response.status} em ${path}`);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export const jsonBody = (data: unknown): RequestInit => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
