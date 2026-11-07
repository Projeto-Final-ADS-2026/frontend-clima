// src/components/SearchHistory.tsx

import { Clock, Trash2 } from 'lucide-react';
import { HistoryItem } from '../types/history';

interface SearchHistoryProps {
  items: HistoryItem[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export const SearchHistory: React.FC<SearchHistoryProps> = ({ items, onSelect, onClear }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
        <Clock size={20} className="text-teal-600" />
        Histórico de buscas
      </h3>
      {items.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={14} />
          Limpar
        </button>
      )}
    </div>

    {items.length === 0 ? (
      <p className="text-sm text-slate-500">Nenhuma busca registrada ainda.</p>
    ) : (
      <ul className="divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.cityName)}
              className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 rounded px-2 transition-colors"
            >
              <span>
                <span className="font-medium text-slate-900">{item.cityName}</span>
                <span className="text-xs text-slate-500 ml-2">{formatDate(item.searchedAt)}</span>
              </span>
              {item.temperature !== null && (
                <span className="font-semibold text-slate-700">{Math.round(item.temperature)}°C</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
