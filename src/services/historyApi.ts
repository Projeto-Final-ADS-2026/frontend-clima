// src/services/historyApi.ts
// Cliente da API de histórico e favoritos (Entrega 3).

import { Favorite, HistoryItem, TrendPoint } from '../types/history';
import { jsonBody, request } from './http';

export const getHistory = (limit = 10) =>
  request<HistoryItem[]>(`/api/historico?limite=${limit}`);

export const clearHistory = () =>
  request<void>('/api/historico', { method: 'DELETE' });

export const getTrend = (city: string, limit = 20) =>
  request<TrendPoint[]>(`/api/historico/tendencia/${encodeURIComponent(city)}?limite=${limit}`);

export const getFavorites = () => request<Favorite[]>('/api/favoritos');

export const addFavorite = (cityName: string, country: string) =>
  request<Favorite>('/api/favoritos', jsonBody({ cityName, country }));

export const removeFavorite = (id: number) =>
  request<void>(`/api/favoritos/${id}`, { method: 'DELETE' });
