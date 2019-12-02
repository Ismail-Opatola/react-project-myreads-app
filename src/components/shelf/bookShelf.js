import React from "react";
import OpenSearch from "../openSearch";
import Books from "./books";
// import BookShelfTitle from './shelf/bookShelfTitle';

const bookShelf = ({ books, switcher }) => {
  console.log("Shelf Component received books as props: ", books);

  const nfilter = str => {
    return books.filter(book => book.shelf === str);
  };

  const currentlyReading = nfilter("currentlyReading");
  const wantToRead = nfilter("wantToRead");
  const read = nfilter("read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <Books books={currentlyReading} switchShelf={switcher}/>
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <Books books={wantToRead} switchShelf={switcher}/>
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <Books books={read} switchShelf={switcher}/>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div>
        <OpenSearch to="/search">Add a book</OpenSearch>
      </div>
    </div>
  );
};

export default bookShelf;

