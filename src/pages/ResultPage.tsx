import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchResultItem from "../components/SearchResultItem";
import SearchBar from "../components/SearchBar";

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-300 py-4 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-blue-600 select-none tracking-wide mr-6">
            <a href="/" className="hover:no-underline">
              Sparrow
            </a>
          </h1>
          <div className="flex-grow max-w-xl">
            <SearchBar initialQuery={query} onSearch={handleSearchBarSearch} />
          </div>
        </div>
      </header>

      <main className="flex-grow p-6 sm:p-8 lg:p-10">
        <div className="w-full max-w-3xl mx-auto text-center">
          {!loading && !error && results.length > 0 && (
            <h2 className="text-md text-gray-700 mb-6">
              About {results.length} results for <strong className="text-blue-600">"{query}"</strong>
            </h2>
          )}

          {loading && (
            <div className="text-center py-8 text-gray-600">
              <svg
                className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 text-left" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">No results found for your query.</div>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="space-y-6 text-left">
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
