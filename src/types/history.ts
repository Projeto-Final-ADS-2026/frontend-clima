// src/types/history.ts

export interface HistoryItem {
  id: number;
  cityName: string;
  country: string;
  temperature: number | null;
  description: string | null;
  searchedAt: string;
}

export interface TrendPoint {
  temperature: number | null;
  feelsLike: number | null;
  humidity: number | null;
  searchedAt: string;
}

export interface Favorite {
  id: number;
  cityName: string;
  country: string;
  createdAt: string;
}
