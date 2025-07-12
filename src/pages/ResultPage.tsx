import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchResultItem from "../components/SearchResultItem";
import SearchBar from "../components/SearchBar";
import "./ResultPage.css";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const query = searchParams.get("q") || "";

  const handleSearchBarSearch = (newQuery: string) => {
    if (newQuery !== query) {
      navigate(`/search?q=${encodeURIComponent(newQuery)}`);
    }
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      fetch(`http://localhost:8080/api/search/article?q=${encodeURIComponent(query)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            const formattedResults: SearchResult[] = data.map((item: any) => ({
              title: item.hit.title,
              url: item.hit.url,
              snippet: item.hit.content,
            }));
            setResults(formattedResults);
          } else {
            setResults([]);
            console.warn("API response was not an array:", data);
          }
        })
        .catch((err) => {
          console.error("Error fetching search results:", err);
          setError("Failed to load search results. Please try again.");
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="results-page">
      <header className="results-header">
        <div className="header-container">
          <h1 className="header-title">
            <a href="/" className="header-link">
              Sparrow
            </a>
          </h1>
          <div className="search-bar-wrapper">
            <SearchBar initialQuery={query} onSearch={handleSearchBarSearch} />
          </div>
        </div>
      </header>

      <main className="results-main">
        <div className="results-container">
          {!loading && !error && results.length > 0 && (
            <h2 className="results-summary">
              About {results.length} results for <strong>"{query}"</strong>
            </h2>
          )}

          {loading && (
            <div className="loading-message">
              <svg
                className="loading-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              </svg>
              Searching...
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && results.length === 0 && (
            <div className="no-results-message">No results found for your query.</div>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="results-list">
              {results.map((result, idx) => (
                <SearchResultItem key={idx} result={result} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
