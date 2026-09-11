// src/services/mockWeatherData.ts

import { WeatherData, ForecastDay } from '../types/weather';

export const mockWeatherData: Record<string, WeatherData> = {
  'são paulo': {
    city: 'São Paulo',
    country: 'Brasil',
    temperature: 28,
    feelsLike: 32,
    condition: 'Parcialmente nublado',
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NE',
    pressure: 1013,
    uvIndex: 7,
    visibility: 10,
    cloudCover: 45,
    lastUpdated: new Date().toISOString(),
  },
  'rio de janeiro': {
    city: 'Rio de Janeiro',
    country: 'Brasil',
    temperature: 31,
    feelsLike: 35,
    condition: 'Ensolarado',
    humidity: 72,
    windSpeed: 15,
    windDirection: 'SE',
    pressure: 1014,
    uvIndex: 9,
    visibility: 10,
    cloudCover: 15,
    lastUpdated: new Date().toISOString(),
  },
  'curitiba': {
    city: 'Curitiba',
    country: 'Brasil',
    temperature: 22,
    feelsLike: 21,
    condition: 'Nublado',
    humidity: 58,
    windSpeed: 8,
    windDirection: 'O',
    pressure: 1015,
    uvIndex: 4,
    visibility: 10,
    cloudCover: 70,
    lastUpdated: new Date().toISOString(),
  },
  'manaus': {
    city: 'Manaus',
    country: 'Brasil',
    temperature: 32,
    feelsLike: 38,
    condition: 'Chuva',
    humidity: 85,
    windSpeed: 10,
    windDirection: 'N',
    pressure: 1011,
    uvIndex: 5,
    visibility: 4,
    cloudCover: 95,
    lastUpdated: new Date().toISOString(),
  },
};

export const mockForecast: ForecastDay[] = [
  {
    date: '2024-12-16',
    day: 'Seg',
    highTemp: 30,
    lowTemp: 22,
    condition: 'Ensolarado',
    icon: 'sun',
    precipitation: 0,
    windSpeed: 10,
  },
  {
    date: '2024-12-17',
    day: 'Ter',
    highTemp: 29,
    lowTemp: 21,
    condition: 'Nublado',
    icon: 'cloud',
    precipitation: 5,
    windSpeed: 12,
  },
  {
    date: '2024-12-18',
    day: 'Qua',
    highTemp: 27,
    lowTemp: 20,
    condition: 'Chuva',
    icon: 'rain',
    precipitation: 25,
    windSpeed: 15,
  },
  {
    date: '2024-12-19',
    day: 'Qui',
    highTemp: 26,
    lowTemp: 19,
    condition: 'Chuva',
    icon: 'rain',
    precipitation: 30,
    windSpeed: 18,
  },
  {
    date: '2024-12-20',
    day: 'Sex',
    highTemp: 28,
    lowTemp: 21,
    condition: 'Parcialmente nublado',
    icon: 'cloud-sun',
    precipitation: 10,
    windSpeed: 11,
  },
];

// Função para simular busca
export const getWeatherByCity = (cityName: string): WeatherData => {
  const city = Object.keys(mockWeatherData).find(
    (key) => key.toLowerCase() === cityName.toLowerCase()
  );
  
  if (city) {
    return mockWeatherData[city];
  }
  
  // Retorna dados aleatórios se não encontrar
  const cities = Object.values(mockWeatherData);
  return cities[Math.floor(Math.random() * cities.length)];
};

// Função para simular delay de rede
export const fetchWeatherSimulated = async (
  cityName: string,
  delay: number = 300
): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getWeatherByCity(cityName));
    }, delay);
  });
};
