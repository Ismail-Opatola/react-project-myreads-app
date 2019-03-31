import React from "react";

const closeSearch = () => {
  return (
    <div>
      <button
        className="close-search"
        onClick={() => this.setState({ showSearchPage: false })}
      >
        Close
      </button>
    </div>
  );
};

export default closeSearch;
