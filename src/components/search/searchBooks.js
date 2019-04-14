import React from "react";
import SearchResults from "./searchResults";
import {searchBar as SearchBar} from "./searchBar";

const searchBooks = ({ books, switcherShelf, searcher, CloseSearchPage }) => {
  return (
    <div className="search-books">
      <SearchBar search={searcher} CloseSearchPage={CloseSearchPage} />
      <SearchResults books={books} switchShelf={switcherShelf} />
    </div>
  );
};

export default searchBooks;

// TODO: handle SearchBar Query
// TODO: handle SearchResult Books render (receive props )
