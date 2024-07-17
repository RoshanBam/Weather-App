import React, { useRef } from "react";
import "./SearchBar.css";
import search_icon from "../assets/search.png";

const SearchBar = ({ onSearchLocation }) => {
  const inputRef = useRef(null);

  const handleSearch = () => {
    onSearchLocation(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" ref={inputRef} />
      <img
        className="search-icon"
        src={search_icon}
        alt=""
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
