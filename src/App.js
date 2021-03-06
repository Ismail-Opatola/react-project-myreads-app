import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./components/shelf/bookShelf";
import "./App.css";
import SearchBooks from "./components/search/searchBooks";
import { searchTerms } from "./components/search/searchBar";
// import MessageBox from './components/messageBox'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    loading: false,
    redirect: false
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(bks =>
        this.setState(() => ({
          books: [...bks],
          searchResults: [],
          loading: false
        }))
      )
      .catch(err => {
        this.setState({ loading: false });
        throw new Error("BooksAPI.getAll: " + err.stack);
      });

    // this.message('Welcome')
  }

  handleLoading = () => {
    this.setState({ loading: true });
  };

  // message = (msg) => {
  //   return <MessageBox message={msg} />
  // }

  xtract = (books, res) => {
    const { currentlyReading, read, wantToRead } = res;
    const bks = books.filter(bk => {
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
    return bks;
  };

  xtractSearchResult = (books, res) => {
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

  resetSR = async() => {

    return this.setState(state => ({
      searchResults: [],
      redirect: true
    }));
  };

  handleCloseSearch = () => {
    this.resetSR().then(() => {
      this.setState({redirect: false})
      window.location.reload()
    });
    return 
  };

  handleSwitcherFromSRPage = async (book, e) => {
    e.preventDefault();
    const shelf = e.target.value;

    try {
      const res = await BooksAPI.update(book, shelf);
      await this.setState(state => {
        const bk = [...this.xtract(state.books, res)];
        if (bk.includes(book)) {
          console.log("state includes this book", book);
          return { books: [...bk], loading: false };
        } else if (!bk.includes(book)) {
          console.log("state does not includes this book", book);
          return { books: [book, ...state.books], loading: false };
        }
      });
    } catch (err) {
      throw new Error("BooksAPI.updateSwitch SRPage: " + err.stack);
    }
  };

  handleShelfSwitcher = (book, e) => {
    e.preventDefault();
    const shelf = e.target.value;
    if (shelf === "none") {
      this.setState(state => ({
        books: state.books.filter(bk => bk !== book),
        loading: false
      }));
    } else {
      BooksAPI.update(book, shelf)
        .then(res => {
          this.setState(state => ({
            books: [...this.xtract(state.books, res)],
            loading: false
          }));
        })
        .catch(err => {
          throw new Error("BooksAPI.update: " + err.stack);
        });
    }
  };

  handleSearch = e => {
    e.preventDefault();

    if (e.target.value.trim() === "" || !searchTerms.includes(e.target.value)) {
      return false;
    }
    let query;
    if (e.target.value.length) {
      query = e.target.value.trim();
    }

    BooksAPI.search(query)
      .then(res => {
        this.setState(state => {
          let x = this.xtractSearchResult(state.books, res);
          return {
            books: [...state.books],
            searchResults: [...x],
            loading: false
          };
        });
      })
      .catch(err => {
        throw new Error("BooksAPI.search", err.stack);
      });
  };

  render() {
    const { books, searchResults, redirect } = this.state;

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
                redirect={redirect}
                  isLoading={this.state.loading}
                  setLoading={this.handleLoading}
                  books={searchResults}
                  switcherShelf={this.handleSwitcherFromSRPage}
                  searcher={this.handleSearch}
                  CloseSearchPage={this.handleCloseSearch}
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
