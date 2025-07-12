// components/SearchBar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic } from "lucide-react";
import "./SearchBar.css";

interface SearchBarProps {
  initialQuery?: string; // Optional prop for initial value
  onSearch?: (query: string) => void; // Callback for when search is performed
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = "", onSearch }) => {
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
    <div className="search-bar-container">
      <Search className="search-icon" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search with Sparrow"
        className="search-input"
      />
      <Mic className="mic-icon" />
    </div>
  );
};

export default SearchBar;
