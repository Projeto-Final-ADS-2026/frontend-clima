// src/components/FavoritesList.tsx

import { Star, X } from 'lucide-react';
import { Favorite } from '../types/history';

interface FavoritesListProps {
  favorites: Favorite[];
  onSelect: (city: string) => void;
  onRemove: (id: number) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onSelect, onRemove }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
      <Star size={20} className="text-amber-400" fill="currentColor" />
      Cidades favoritas
    </h3>

    {favorites.length === 0 ? (
      <p className="text-sm text-slate-500">
        Use a estrela no clima atual para favoritar uma cidade.
      </p>
    ) : (
      <ul className="flex flex-wrap gap-2">
        {favorites.map((fav) => (
          <li
            key={fav.id}
            className="flex items-center rounded-full bg-teal-50 border border-teal-100 text-teal-800"
          >
            <button
              type="button"
              onClick={() => onSelect(fav.cityName)}
              className="pl-3 pr-2 py-1 text-sm hover:text-teal-600 transition-colors"
            >
              {fav.cityName}
            </button>
            <button
              type="button"
              onClick={() => onRemove(fav.id)}
              aria-label={`Remover ${fav.cityName} dos favoritos`}
              className="pr-2 py-1 text-teal-400 hover:text-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
