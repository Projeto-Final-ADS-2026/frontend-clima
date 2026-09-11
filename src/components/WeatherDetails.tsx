// src/components/WeatherDetails.tsx

import { WeatherData } from '../types/weather';
import { Wind, Eye, Gauge, Sun, Droplets, Compass } from 'lucide-react';

interface WeatherDetailsProps {
  data: WeatherData;
}

interface DetailCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  const details: DetailCard[] = [
    {
      icon: <Wind size={24} className="text-blue-500" />,
      label: 'Velocidade do Vento',
      value: data.windSpeed,
      unit: 'km/h',
    },
    {
      icon: <Compass size={24} className="text-blue-500" />,
      label: 'Direção do Vento',
      value: data.windDirection,
    },
    {
      icon: <Eye size={24} className="text-blue-500" />,
      label: 'Visibilidade',
      value: data.visibility,
      unit: 'km',
    },
    {
      icon: <Gauge size={24} className="text-blue-500" />,
      label: 'Pressão',
      value: data.pressure,
      unit: 'mb',
    },
    {
      icon: <Sun size={24} className="text-orange-500" />,
      label: 'Índice UV',
      value: data.uvIndex,
    },
    {
      icon: <Droplets size={24} className="text-blue-500" />,
      label: 'Cobertura de Nuvens',
      value: data.cloudCover,
      unit: '%',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {details.map((detail, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-teal-200 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            {detail.icon}
            <h3 className="text-sm font-medium text-slate-700">
              {detail.label}
            </h3>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold text-slate-900">
              {detail.value}
            </p>
            {detail.unit && (
              <p className="text-sm text-slate-600">{detail.unit}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
