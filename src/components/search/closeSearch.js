import React from "react";
import { Link, Redirect } from "react-router-dom";

const closeSearch = ({ CloseSearchPage }) => {
  return (
    <div onClick={() => CloseSearchPage()}>
      <Link className="close-search" to="/" alt="home">🡠</Link>
    </div>
  );
};

export default closeSearch;
