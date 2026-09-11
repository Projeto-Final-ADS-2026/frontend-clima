// src/types/weather.ts

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  uvIndex: number;
  visibility: number;
  cloudCover: number;
  lastUpdated: string;
}

export interface ForecastDay {
  date: string;
  day: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

export interface DetailItem {
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
}
