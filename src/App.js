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
        throw new Error("BooksAPI.getAll: " + err.stack);
      });
  }

  handleShelfSwitcher = (book, e) => {
    e.preventDefault();
    console.log("handleShelfSwitcher e value:", e.target.value);
    const shelf = e.target.value;

    BooksAPI.update(book, shelf)
      .then(res => {
        this.setState((state, props) => ({
          books: [...this.xtract(state, res)]
        }));
      })
      .catch(err => {
        throw new Error("BooksAPI.update: " + err.stack);
      });
  };

  xtract = (state, res) => {
    const { currentlyReading, read, wantToRead } = res;
    const books = state.books.filter(bk => {
      if (currentlyReading.length && currentlyReading.includes(bk.id)) {
        bk.shelf = "currentlyReading";
        return bk;
      } else if (read.length && read.includes(bk.id)) {
        bk.shelf = "read";
        return bk;
      } else if (wantToRead.length && wantToRead.includes(bk.id)) {
        bk.shelf = "wantToRead";
        return bk;
      }
      return bk;
    });
    console.log("x-books:", books);
    return books;
  };

  handleSearch = e => {
    e.preventDefault();

    if(e.target.value.trim() === ""){
      return false;
    }	
    let query;
    if (e.target.value.length) {
      query = e.target.value.trim();
    }

    BooksAPI.search(query)
      .then(res => {
        this.setState(({books}) => {
          let x = this.xtractr(books, res)
          return {
            books: [...x]
          }
        })
      })
      .catch(err => {
        throw new Error("BooksAPI.search", err.stack);
      });
  };

  xtractr = (books, res) => {

    let xrs = res.reduce((acc, curr) => {
      let add = books.find(bk => bk.id === curr.id);
      if (add) {
        acc.push(add);
      }
      if (!add) {
        acc.push(curr);
      }
      return acc;
    }, []);

    return xrs;
  };

  render() {
    const { books } = this.state;

    const isLoading = books.length === 0 && (
      <div className="isLoading">Loading...</div>
    );

    return (
      <div className="app">
        {isLoading || (
          <>
            <Route
              exact
              path="/"
              render={() => (
                <BookShelf books={books} switcher={this.handleShelfSwitcher} />
              )}
            />
            <Route
              exact
              path="/search"
              render={() => (
                <SearchBooks
                  books={books}
                  switcher={this.handleShelfSwitcher}
                  searcher={this.handleSearch}
                />
              )}
            />
          </>
        )}
      </div>
    );
  }
}

export default BooksApp;

// x = (state, res) => {
  //   let { books } = state

  //   let xrs = res.reduce((acc, curr) => {

  //     let add = books.find(bk => bk.id === curr.id)
  //     if(!add) {
  //       acc[curr.id] = curr
  //     }
  //     return acc
  //   }, {})

  //   // console.log("xrs:", xrs)
  //   // console.log("Obj-xrs:", Object.values(xrs))
  //   // let xmm = Object.values(xrs)
  //   return xrs
  // }

  // xtractr = (books, res) => {
  //   // let { books } = state;

  //   let xrs = res.reduce((acc, curr) => {
  //     let add = books.find(bk => bk.id === curr.id);
  //     if (!add) {
  //       acc.push(curr);
  //     }
  //     return acc;
  //   }, []);

  //   return xrs;
  // };