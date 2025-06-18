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
    <div className="mb-6 px-6 py-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer">
      <div className="flex items-center text-sm text-gray-600 mb-1">
        {faviconUrl && (
          <img
            src={faviconUrl}
            alt=""
            className="w-4 h-4 mr-2 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <a href={result.url} className="truncate max-w-full hover:underline" target="_blank" rel="noopener noreferrer">
          {domain}
        </a>
      </div>

      <h3 className="mb-1">
        <a
          href={result.url}
          className="text-blue-800 text-lg sm:text-xl hover:underline font-semibold break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {result.title}
        </a>
      </h3>

      <p className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: result.snippet }} />
    </div>
  );
};

export default SearchResultItem;
