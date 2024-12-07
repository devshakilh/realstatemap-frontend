import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

// Example city list for suggestions (this could be fetched from an API)
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "Indianapolis",
  "San Francisco",
  "Seattle",
  "Dhaka",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Nashville",
  "Detroit",
  "Oklahoma City",
  "Portland",
  "Las Vegas",
  "Memphis",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Mesa",
  "Sacramento",
  "Atlanta",
  "Kansas City",
  "Colorado Springs",
  "Miami",
  "Raleigh",
];


function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "Dhaka",
    minPrice: 0,
    maxPrice: 0,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [errors, setErrors] = useState({ minPrice: "", maxPrice: "" });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));

    // Filter city suggestions based on user input
    if (name === "city") {
      const filteredSuggestions = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }

    
    
  };

  const handleSuggestionClick = (city) => {
    setQuery((prev) => ({ ...prev, city }));
    setSuggestions([]); // Hide suggestions after selection
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        Math.max(prevIndex - 1, 0)
      );
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      setQuery((prev) => ({ ...prev, city: suggestions[activeSuggestionIndex] }));
      setSuggestions([]); // Hide suggestions on selection
    }
  };

  const isButtonDisabled = errors.minPrice || errors.maxPrice;

  return (
    <div className="searchBar">
      <div className="type">
        {["buy", "rent"].map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={query.city}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Handle keyboard navigation
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((city, index) => (
              <li
                key={city}
                onClick={() => handleSuggestionClick(city)}
                className={index === activeSuggestionIndex ? "active" : ""}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
        <input

  name="minPrice"
  min={0}

  placeholder="Min Price"
  onChange={handleChange}
  onKeyPress={(e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault(); // Prevent non-numeric input
    }
  }}
  onPaste={(e) => {
    const pasteContent = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pasteContent)) {
      e.preventDefault(); // Prevent pasting non-numeric content
    }
  }}
/>
{errors.minPrice && (
          <p className="error-message">{errors.minPrice}</p>
        )}

<input
 
  name="maxPrice"
  min={0}

  placeholder="Max Price"
  onChange={handleChange}
  onKeyPress={(e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault(); // Prevent non-numeric input
    }
  }}
  onPaste={(e) => {
    const pasteContent = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pasteContent)) {
      e.preventDefault(); // Prevent pasting non-numeric content
    }
  }}
/>

        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
