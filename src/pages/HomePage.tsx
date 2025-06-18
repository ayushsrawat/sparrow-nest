import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 font-sans flex flex-col items-center justify-center overflow-hidden touch-none">
      <h1 className="text-[76px] font-light text-blue-700 mb-32 select-none tracking-wide drop-shadow-sm">Sparrow</h1>

      <div className="w-full max-w-[600px] px-6">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default HomePage;
