// src/pages/Home.tsx

import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CurrentWeather } from '../components/CurrentWeather';
import { WeatherDetails } from '../components/WeatherDetails';
import { ForecastChart } from '../components/ForecastChart';
import { SearchHistory } from '../components/SearchHistory';
import { FavoritesList } from '../components/FavoritesList';
import { TemperatureTrend } from '../components/TemperatureTrend';
import { WeatherData } from '../types/weather';
import { Favorite, HistoryItem, TrendPoint } from '../types/history';
import { fetchWeatherSimulated, mockForecast } from '../services/mockWeatherData';
import {
  addFavorite,
  clearHistory,
  getFavorites,
  getHistory,
  getTrend,
  removeFavorite,
} from '../services/historyApi';

export const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [trend, setTrend] = useState<TrendPoint[]>([]);

  const currentFavorite = weather
    ? favorites.find((f) => f.cityName.toLowerCase() === weather.city.toLowerCase())
    : undefined;

  // Histórico, favoritos e tendência vêm do banco; se a API falhar, a busca de clima continua funcionando
  const refreshHistory = async () => {
    try {
      setHistory(await getHistory(10));
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
    }
  };

  const refreshFavorites = async () => {
    try {
      setFavorites(await getFavorites());
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  const refreshTrend = async (city: string) => {
    try {
      setTrend(await getTrend(city, 20));
    } catch (err) {
      console.error('Erro ao carregar tendência:', err);
      setTrend([]);
    }
  };

  const handleToggleFavorite = async () => {
    if (!weather) return;
    try {
      if (currentFavorite) {
        await removeFavorite(currentFavorite.id);
      } else {
        await addFavorite(weather.city, weather.countryCode ?? weather.country);
      }
      await refreshFavorites();
    } catch (err) {
      console.error('Erro ao atualizar favoritos:', err);
      setError('Não foi possível atualizar os favoritos.');
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      await removeFavorite(id);
      await refreshFavorites();
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      setError('Não foi possível remover o favorito.');
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistory();
      setHistory([]);
      setTrend([]);
    } catch (err) {
      console.error('Erro ao limpar histórico:', err);
      setError('Não foi possível limpar o histórico.');
    }
  };

  // Carregar clima padrão, histórico e favoritos ao montar
  useEffect(() => {
    handleSearch('São Paulo');
    refreshFavorites();
  }, []);

  const handleSearch = async (city: string) => {
  if (!city.trim()) {
    setError('Digite o nome de uma cidade');
    return;
  }
  
  setIsLoading(true);
  setError(null);
  setWeather(null);
  
  try {
    const data = await fetchWeatherSimulated(city);
    
    if (!data) {
      setError(`Cidade "${city}" não encontrada. Tente: São Paulo, Rio de Janeiro, Curitiba ou Manaus`);
      return;
    }
    
    setWeather(data);

    // O backend grava a consulta no histórico; recarrega a lista e a tendência da cidade
    await Promise.all([refreshHistory(), refreshTrend(data.city)]);

  } catch (err) {
    setError('Erro ao conectar com servidor.');
    setWeather(null);
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
              <CurrentWeather
                data={weather}
                isFavorite={!!currentFavorite}
                onToggleFavorite={handleToggleFavorite}
              />
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

            {/* Tendência de temperatura (histórico) */}
            <section>
              <TemperatureTrend city={weather.city} points={trend} />
            </section>

            {/* Favoritos e histórico */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FavoritesList
                favorites={favorites}
                onSelect={handleSearch}
                onRemove={handleRemoveFavorite}
              />
              <SearchHistory
                items={history}
                onSelect={handleSearch}
                onClear={handleClearHistory}
              />
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
