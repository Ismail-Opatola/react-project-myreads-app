import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf  from './components/shelf'
import './App.css'
import SearchBooks from './components/searchBooks';

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
  }

  componentDidMount() {

    BooksAPI.getAll()
      .then(books =>
        this.setState(() => ({
          books
        }))
      )
      .then(() => { console.log("getAllBooksUpdateToState:", this.state) })
      .catch((err) => {
        throw new Error('BooksAPI.getAll: ' + err);
      })
  }

  render() {
    const { books } = this.state
    console.log("CurrentStateAfterGetAll:", books)

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <Shelf books={books} />
        )}
      </div>
    )
  }
}

export default BooksApp
