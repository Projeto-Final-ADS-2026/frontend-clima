// src/services/historyApi.ts
// Cliente da API de histórico e favoritos (Entrega 3).

import { Favorite, HistoryItem, TrendPoint } from '../types/history';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, init);
  if (!response.ok) {
    throw new Error(`Erro ${response.status} em ${path}`);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export const getHistory = (limit = 10) =>
  request<HistoryItem[]>(`/api/historico?limite=${limit}`);

export const clearHistory = () =>
  request<void>('/api/historico', { method: 'DELETE' });

export const getTrend = (city: string, limit = 20) =>
  request<TrendPoint[]>(`/api/historico/tendencia/${encodeURIComponent(city)}?limite=${limit}`);

export const getFavorites = () => request<Favorite[]>('/api/favoritos');

export const addFavorite = (cityName: string, country: string) =>
  request<Favorite>('/api/favoritos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cityName, country }),
  });

export const removeFavorite = (id: number) =>
  request<void>(`/api/favoritos/${id}`, { method: 'DELETE' });
