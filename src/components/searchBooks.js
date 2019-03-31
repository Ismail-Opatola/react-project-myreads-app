import React from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";

const search = () => {
  return (
    <div className="search-books">
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default search;
