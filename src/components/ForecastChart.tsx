// src/components/ForecastChart.tsx

import { ForecastDay } from '../types/weather';
import { Cloud, CloudRain, Sun, CloudDrizzle, Droplets } from 'lucide-react';

interface ForecastChartProps {
  forecast: ForecastDay[];
}

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case 'sun':
      return <Sun size={32} className="text-amber-400" />;
    case 'rain':
      return <CloudRain size={32} className="text-slate-500" />;
    case 'cloud':
      return <Cloud size={32} className="text-slate-400" />;
    case 'cloud-sun':
      return <CloudDrizzle size={32} className="text-slate-400" />;
    default:
      return <Sun size={32} className="text-amber-400" />;
  }
};

export const ForecastChart: React.FC<ForecastChartProps> = ({ forecast }) => {
  // Encontra as temperaturas min/max para escalar o gráfico
  const allTemps = forecast.flatMap((d) => [d.highTemp, d.lowTemp]);
  const maxTemp = Math.max(...allTemps);
  const minTemp = Math.min(...allTemps);
  const tempRange = maxTemp - minTemp;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-8">
        Previsão para 5 dias
      </h3>

      <div className="space-y-6">
        {forecast.map((day, index) => {
          const highPercent =
            ((day.highTemp - minTemp) / tempRange) * 100;
          const lowPercent =
            ((day.lowTemp - minTemp) / tempRange) * 100;

          return (
            <div key={index} className="space-y-3">
              {/* Header do dia */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-16 text-sm font-semibold text-slate-900">
                    {day.day}
                  </div>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(day.icon)}
                    <p className="text-sm text-slate-600 whitespace-nowrap">
                      {day.condition}
                    </p>
                  </div>
                </div>

                {/* Temperaturas */}
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="text-sm text-slate-600">Máx.</p>
                    <p className="text-lg font-bold text-slate-900">
                      {day.highTemp}°
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Mín.</p>
                    <p className="text-lg font-bold text-slate-600">
                      {day.lowTemp}°
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de temperatura */}
              <div className="h-8 bg-gradient-to-r from-blue-200 via-green-200 to-orange-200 rounded-full overflow-hidden relative">
                <div
                  className="absolute h-full w-1 bg-slate-900 rounded-full"
                  style={{ left: `${lowPercent}%` }}
                  title={`Mínima: ${day.lowTemp}°C`}
                />
                <div
                  className="absolute h-full w-1 bg-orange-500 rounded-full"
                  style={{ left: `${highPercent}%` }}
                  title={`Máxima: ${day.highTemp}°C`}
                />
              </div>

              {/* Detalhes adicionais */}
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1 text-blue-600">
                  <Droplets size={16} />
                  <span>{day.precipitation}%</span>
                </div>
                <div className="text-slate-600">
                  Vento: {day.windSpeed} km/h
                </div>
              </div>

              {index < forecast.length - 1 && (
                <div className="border-t border-slate-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
