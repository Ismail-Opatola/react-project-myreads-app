import React from "react";
import SearchResults from "./searchResults";
import SearchBar from "./searchBar";

const searchBooks = ({books, switcher, searcher}) => {
  return (
    <div className="search-books">
      <SearchBar search={searcher}/>
      <SearchResults books={books} switchShelf={switcher}/>
    </div>
  );
};

export default searchBooks;

// TODO: handle SearchBar Query
// TODO: handle SearchResult Books render (receive props )