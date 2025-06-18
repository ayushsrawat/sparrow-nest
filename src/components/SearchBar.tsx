// components/SearchBar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string; // Optional prop for initial value
  onSearch?: (query: string) => void; // Callback for when search is performed
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '', onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim()); // Use callback if provided
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-5 py-3 shadow-md hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
      <Search className="w-5 h-5 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search with Sparrow"
        className="flex-1 text-base text-gray-800 bg-transparent placeholder-gray-500 focus:outline-none"
      />
      <Mic className="w-5 h-5 text-blue-600 hover:text-blue-700 cursor-pointer transition" />
    </div>
  );
};

export default SearchBar;