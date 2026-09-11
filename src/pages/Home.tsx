// src/pages/Home.tsx

import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CurrentWeather } from '../components/CurrentWeather';
import { WeatherDetails } from '../components/WeatherDetails';
import { ForecastChart } from '../components/ForecastChart';
import { WeatherData } from '../types/weather';
import { fetchWeatherSimulated, mockForecast } from '../services/mockWeatherData';

export const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar clima padrão ao montar
  useEffect(() => {
    handleSearch('São Paulo');
  }, []);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherSimulated(city, 500);
      setWeather(data);
    } catch (err) {
      setError('Não foi possível carregar os dados');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Clima</h1>
              <p className="text-slate-600 text-sm mt-1">
                Previsão do tempo detalhada
              </p>
            </div>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
              </div>
              <p className="text-slate-600">Buscando clima...</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {weather && !isLoading && (
          <>
            {/* Clima Atual */}
            <section>
              <CurrentWeather data={weather} />
            </section>

            {/* Detalhes */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Detalhes
              </h2>
              <WeatherDetails data={weather} />
            </section>

            {/* Previsão */}
            <section>
              <ForecastChart forecast={mockForecast} />
            </section>

            {/* Info Footer */}
            <section className="bg-slate-100/50 rounded-xl p-6 text-center text-sm text-slate-600">
              <p>
               Desenvolvido por Hiago dos Santos Oliveira. Projeto final.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
