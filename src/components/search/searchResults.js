import React from "react";
import Books from "../shelf/books";

const searchResults = ({ books }) => {
  console.log("SearchResults Component received books as props: ", books);

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        <Books books={books} />
      </ol>
    </div>
  );
};

export default searchResults;
