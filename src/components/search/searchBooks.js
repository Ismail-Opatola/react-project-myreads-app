import React from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";

const searchBooks = () => {
  return (
    <div className="search-books">
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default searchBooks;

// TODO: handle SearchBar Query
// TODO: handle SearchResult Books render (receive props )