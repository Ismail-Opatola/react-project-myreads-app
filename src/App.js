import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./components/shelf/bookShelf";
import "./App.css";
import SearchBooks from "./components/search/searchBooks";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books =>
        this.setState(() => ({
          books
        }))
      )
      .then(() => {
        console.log("getAllBooksUpdateToState:", this.state);
      })
      .catch(err => {
        throw new Error("BooksAPI.getAll: " + err);
      });
  }

  render() {
    const { books } = this.state;
    console.log("CurrentStateAfterGetAll:", books);
    const isLoading = books.length === 0 && (
      <div className="isLoading">Loading...</div>
    );

    return (
      <div className="app">
        {isLoading || (
          <>
            <Route exact path="/" render={() => <BookShelf books={books} />} />
            <Route exact path="/search" render={() => <SearchBooks />} />
          </>
        )}
      </div>
    );
  }
}

export default BooksApp;
