import React from "react";

// TODO: Handle Select Options functionality

const books = ({ books, switchShelf }) => {
  console.log("Books Component received books as props: ", books);

  const bookshelf = books.map(book => (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + ( book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : null) + ")"
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={(e) => switchShelf(book, e)}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading" hidden>Currently Reading</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map(author =>
          <div className="book-authors" key={author}>{author}</div>
        )}
      </div>
    </li>
  ));
  return bookshelf;
};

export default books;


