import "./SearchResultItem.css";

interface SearchResultItemProps {
  result: {
    title: string;
    url: string;
    snippet: string;
  };
}

const getFaviconAndDomain = (url: string) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}`;
    return { domain, faviconUrl };
  } catch (e) {
    console.error("Invalid URL for favicon/domain extraction:", url, e);
    return { domain: url, faviconUrl: null };
  }
};

const SearchResultItem = ({ result }: SearchResultItemProps) => {
  const { domain, faviconUrl } = getFaviconAndDomain(result.url);

  return (
    <div className="search-result-item">
      <div className="search-result-header">
        {faviconUrl && (
          <img
            src={faviconUrl}
            alt=""
            className="favicon"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <a href={result.url} className="search-result-domain" target="_blank" rel="noopener noreferrer">
          {domain}
        </a>
      </div>

      <a href={result.url} className="search-result-title" target="_blank" rel="noopener noreferrer">
        {result.title}
      </a>

      <p className="search-result-snippet">{result.snippet}</p>
    </div>
  );
};

export default SearchResultItem;
