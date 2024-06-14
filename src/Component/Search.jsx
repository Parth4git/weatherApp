import React from "react";

const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        className="search-box"
        placeholder="Enter name of city"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
