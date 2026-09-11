// src/components/SearchBar.tsx

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Busque uma cidade..."
          disabled={isLoading}
          className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 text-slate-400 hover:text-teal-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Manaus'].map((city) => (
          <button
            key={city}
            onClick={() => onSearch(city)}
            disabled={isLoading}
            className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-700 transition-colors disabled:opacity-50"
          >
            {city}
          </button>
        ))}
      </div>
    </form>
  );
};
