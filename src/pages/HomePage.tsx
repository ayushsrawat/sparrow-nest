import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="home-page">
      <h1 className="home-title">Sparrow</h1>
      <div className="search-bar-wrapper">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default HomePage;
