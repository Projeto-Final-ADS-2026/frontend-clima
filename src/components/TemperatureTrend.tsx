// src/components/TemperatureTrend.tsx
// Gráfico de tendência de temperatura, construído a partir do histórico de buscas (SVG, sem dependências).

import { TrendPoint } from '../types/history';

interface TemperatureTrendProps {
  city: string;
  points: TrendPoint[];
}

const WIDTH = 640;
const HEIGHT = 220;
const PAD = { top: 20, right: 24, bottom: 36, left: 40 };

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export const TemperatureTrend: React.FC<TemperatureTrendProps> = ({ city, points }) => {
  const valid = points.filter((p) => p.temperature !== null) as (TrendPoint & { temperature: number })[];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-1">Tendência de temperatura</h3>
      <p className="text-sm text-slate-600 mb-6">
        Últimas consultas de {city} registradas no histórico
      </p>

      {valid.length < 2 ? (
        <p className="text-slate-500 text-sm py-8 text-center">
          Pesquise {city} mais vezes para ver a evolução da temperatura.
        </p>
      ) : (
        <TrendSvg points={valid} />
      )}
    </div>
  );
};

const TrendSvg: React.FC<{ points: (TrendPoint & { temperature: number })[] }> = ({ points }) => {
  const temps = points.map((p) => p.temperature);
  const min = Math.floor(Math.min(...temps)) - 1;
  const max = Math.ceil(Math.max(...temps)) + 1;
  const innerW = WIDTH - PAD.left - PAD.right;
  const innerH = HEIGHT - PAD.top - PAD.bottom;

  const x = (i: number) => PAD.left + (i / (points.length - 1)) * innerW;
  const y = (t: number) => PAD.top + (1 - (t - min) / (max - min)) * innerH;

  const line = points.map((p, i) => `${x(i)},${y(p.temperature)}`).join(' ');
  const ticks = [min, (min + max) / 2, max];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-auto"
      role="img"
      aria-label="Gráfico de linha com a temperatura das últimas consultas"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y(t)} y2={y(t)} stroke="#e2e8f0" strokeDasharray="4 4" />
          <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#64748b">
            {Math.round(t)}°
          </text>
        </g>
      ))}

      <polyline points={line} fill="none" stroke="#0F766E" strokeWidth="3" strokeLinejoin="round" />

      {points.map((p, i) => (
        <g key={`${p.searchedAt}-${i}`}>
          <circle cx={x(i)} cy={y(p.temperature)} r="5" fill="#FCA311" stroke="#0F766E" strokeWidth="2">
            <title>{`${Math.round(p.temperature)}°C em ${formatTime(p.searchedAt)}`}</title>
          </circle>
          <text x={x(i)} y={y(p.temperature) - 10} textAnchor="middle" fontSize="11" fill="#0f172a">
            {Math.round(p.temperature)}°
          </text>
        </g>
      ))}

      <text x={PAD.left} y={HEIGHT - 10} fontSize="11" fill="#64748b">
        {formatTime(points[0].searchedAt)}
      </text>
      <text x={WIDTH - PAD.right} y={HEIGHT - 10} textAnchor="end" fontSize="11" fill="#64748b">
        {formatTime(points[points.length - 1].searchedAt)}
      </text>
    </svg>
  );
};
