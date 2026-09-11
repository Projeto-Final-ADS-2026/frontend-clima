// src/components/CurrentWeather.tsx

import { WeatherData } from '../types/weather';
import { Cloud, CloudRain, Sun, CloudDrizzle, Wind } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('chuva')) {
    return <CloudRain size={120} className="text-slate-500" />;
  }
  if (conditionLower.includes('ensolarado')) {
    return <Sun size={120} className="text-amber-400" />;
  }
  if (conditionLower.includes('nublado')) {
    return <Cloud size={120} className="text-slate-400" />;
  }
  if (conditionLower.includes('parcialmente')) {
    return <CloudDrizzle size={120} className="text-slate-400" />;
  }
  return <Sun size={120} className="text-amber-400" />;
};

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-sm border border-teal-100">
      {/* Header com localização */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{data.city}</h2>
          <p className="text-slate-600 mt-1">{data.country}</p>
        </div>
        <span className="text-sm text-slate-500">
          Atualizado agora
        </span>
      </div>

      {/* Temperatura e Condição */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-start">
          <span className="text-7xl font-bold text-slate-900 leading-none">
            {Math.round(data.temperature)}°
          </span>
          <span className="text-2xl text-slate-600 ml-2 mt-2">C</span>
        </div>
        
        <div className="flex flex-col items-center">
          {getWeatherIcon(data.condition)}
        </div>
      </div>

      {/* Descrição e sensação térmica */}
      <div className="mb-8">
        <p className="text-xl text-slate-700 font-medium mb-2">
          {data.condition}
        </p>
        <p className="text-slate-600">
          Sensação de {Math.round(data.feelsLike)}°C
        </p>
      </div>

      {/* Detalhes rápidos em linha */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-teal-200">
        <div>
          <p className="text-sm text-slate-600 mb-1">Umidade</p>
          <p className="text-lg font-semibold text-slate-900">{data.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-1">Vento</p>
          <div className="flex items-center gap-1">
            <Wind size={16} className="text-slate-600" />
            <p className="text-lg font-semibold text-slate-900">{data.windSpeed} km/h</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-1">Pressão</p>
          <p className="text-lg font-semibold text-slate-900">{data.pressure} mb</p>
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-1">Visibilidade</p>
          <p className="text-lg font-semibold text-slate-900">{data.visibility} km</p>
        </div>
      </div>
    </div>
  );
};
